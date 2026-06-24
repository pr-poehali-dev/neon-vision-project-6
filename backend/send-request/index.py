import json
import os
import base64
import requests
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

    try:
        body = json.loads(event.get('body', '{}'))
    except Exception as e:
        print(f"[ERROR] JSON parse: {e}")
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный формат запроса'})
        }

    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    comment = body.get('comment', '').strip()
    photos = body.get('photos', [])

    print(f"[INFO] name={name}, phone={phone}, photos={len(photos)}")

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']
    tg_base = f"https://api.telegram.org/bot{token}"

    text = (
        f"🔔 *Новая заявка с сайта*\n\n"
        f"👤 *Имя:* {name}\n"
        f"📞 *Телефон:* {phone}"
    )
    if comment:
        text += f"\n💬 *Комментарий:* {comment}"
    if photos:
        text += f"\n📷 *Фото:* {len(photos)} шт."

    try:
        if photos:
            s3 = boto3.client(
                's3',
                endpoint_url='https://bucket.poehali.dev',
                aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
            )

            for i, p in enumerate(photos[:5]):
                photo_bytes = base64.b64decode(p['data'])
                photo_name = p.get('name', f'photo_{i}.jpg')
                ext = photo_name.rsplit('.', 1)[-1].lower() if '.' in photo_name else 'jpg'
                ct = f"image/{ext}" if ext in ('jpg', 'jpeg', 'png', 'gif', 'webp') else 'image/jpeg'

                print(f"[INFO] Photo {i}: {photo_name}, {len(photo_bytes)} bytes")

                s3.put_object(
                    Bucket='files',
                    Key=f"repairs/{context.request_id}_{i}.{ext}",
                    Body=photo_bytes,
                    ContentType=ct
                )

                caption = text if i == 0 else ""
                resp = requests.post(
                    f"{tg_base}/sendPhoto",
                    data={'chat_id': chat_id, 'caption': caption, 'parse_mode': 'Markdown'},
                    files={'photo': (photo_name, photo_bytes, ct)},
                    timeout=20
                )
                print(f"[INFO] sendPhoto: {resp.status_code} {resp.text[:200]}")
                resp.raise_for_status()
        else:
            resp = requests.post(
                f"{tg_base}/sendMessage",
                json={'chat_id': chat_id, 'text': text, 'parse_mode': 'Markdown'},
                timeout=10
            )
            print(f"[INFO] sendMessage: {resp.status_code} {resp.text[:200]}")
            resp.raise_for_status()

    except Exception as e:
        print(f"[ERROR] {e}")
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
