import json
import os
import base64
import urllib.request
import boto3


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта в Telegram-бот мастерской Очки Плюс (с фото поломки)"""
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
    photo_b64 = body.get('photo')
    photo_name = body.get('photoName', 'photo.jpg')

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

    if photo_b64:
        photo_bytes = base64.b64decode(photo_b64)
        ext = photo_name.rsplit('.', 1)[-1].lower() if '.' in photo_name else 'jpg'
        content_type = f"image/{ext}" if ext in ('jpg', 'jpeg', 'png', 'gif', 'webp') else 'image/jpeg'

        s3 = boto3.client(
            's3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
        )
        key = f"repairs/{context.request_id}.{ext}"
        s3.put_object(Bucket='files', Key=key, Body=photo_bytes, ContentType=content_type)

        # Отправляем текст + фото через sendPhoto
        api_url = f"https://api.telegram.org/bot{token}/sendPhoto"

        boundary = "----FormBoundary"
        body_parts = []
        body_parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="chat_id"\r\n\r\n{chat_id}'.encode())
        body_parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="caption"\r\n\r\n{text}'.encode())
        body_parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="parse_mode"\r\n\r\nMarkdown'.encode())
        body_parts.append(
            f'--{boundary}\r\nContent-Disposition: form-data; name="photo"; filename="{photo_name}"\r\nContent-Type: {content_type}\r\n\r\n'.encode()
            + photo_bytes
        )
        body_parts.append(f'--{boundary}--'.encode())
        multipart_body = b'\r\n'.join(body_parts)

        req = urllib.request.Request(
            api_url,
            data=multipart_body,
            headers={'Content-Type': f'multipart/form-data; boundary={boundary}'}
        )
        urllib.request.urlopen(req)
    else:
        # Только текст
        api_url = f"https://api.telegram.org/bot{token}/sendMessage"
        payload = json.dumps({
            'chat_id': chat_id,
            'text': text,
            'parse_mode': 'Markdown'
        }).encode('utf-8')
        req = urllib.request.Request(api_url, data=payload, headers={'Content-Type': 'application/json'})
        urllib.request.urlopen(req)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
