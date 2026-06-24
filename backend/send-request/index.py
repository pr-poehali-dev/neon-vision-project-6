import json
import os
import base64
import urllib.request
import boto3


def tg_send(token: str, method: str, data: bytes, content_type: str):
    req = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/{method}",
        data=data,
        headers={'Content-Type': content_type}
    )
    urllib.request.urlopen(req)


def send_photo(token: str, chat_id: str, photo_bytes: bytes, photo_name: str, content_type: str, caption: str = ""):
    boundary = "----FormBoundary"
    parts = [
        f'--{boundary}\r\nContent-Disposition: form-data; name="chat_id"\r\n\r\n{chat_id}'.encode(),
        f'--{boundary}\r\nContent-Disposition: form-data; name="parse_mode"\r\n\r\nMarkdown'.encode(),
    ]
    if caption:
        parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="caption"\r\n\r\n{caption}'.encode())
    parts.append(
        f'--{boundary}\r\nContent-Disposition: form-data; name="photo"; filename="{photo_name}"\r\nContent-Type: {content_type}\r\n\r\n'.encode()
        + photo_bytes
    )
    parts.append(f'--{boundary}--'.encode())
    tg_send(token, "sendPhoto", b'\r\n'.join(parts), f'multipart/form-data; boundary={boundary}')


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта в Telegram-бот мастерской Очки Плюс (с несколькими фото поломки)"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    comment = body.get('comment', '').strip()
    photos = body.get('photos', [])

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']

    text = (
        f"🔔 *Новая заявка с сайта*\n\n"
        f"👤 *Имя:* {name}\n"
        f"📞 *Телефон:* {phone}"
    )
    if comment:
        text += f"\n💬 *Комментарий:* {comment}"
    if photos:
        text += f"\n📷 *Фото:* {len(photos)} шт."

    if photos:
        s3 = boto3.client(
            's3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
        )

        for i, p in enumerate(photos[:10]):
            photo_bytes = base64.b64decode(p['data'])
            photo_name = p.get('name', f'photo_{i}.jpg')
            ext = photo_name.rsplit('.', 1)[-1].lower() if '.' in photo_name else 'jpg'
            ct = f"image/{ext}" if ext in ('jpg', 'jpeg', 'png', 'gif', 'webp') else 'image/jpeg'

            s3.put_object(Bucket='files', Key=f"repairs/{context.request_id}_{i}.{ext}", Body=photo_bytes, ContentType=ct)

            caption = text if i == 0 else ""
            send_photo(token, chat_id, photo_bytes, photo_name, ct, caption)
    else:
        payload = json.dumps({'chat_id': chat_id, 'text': text, 'parse_mode': 'Markdown'}).encode()
        tg_send(token, "sendMessage", payload, 'application/json')

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
