import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Получение и добавление отзывов для сайта Очки Плюс"""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if event.get('httpMethod') == 'GET':
        cur.execute("""
            SELECT id, name, text, stars, created_at
            FROM reviews
            WHERE approved = TRUE
            ORDER BY created_at DESC
            LIMIT 20
        """)
        rows = cur.fetchall()
        reviews = [
            {'id': r[0], 'name': r[1], 'text': r[2], 'stars': r[3], 'date': r[4].strftime('%d.%m.%Y')}
            for r in rows
        ]
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'reviews': reviews}, ensure_ascii=False)}

    if event.get('httpMethod') == 'POST':
        body = json.loads(event.get('body') or '{}')
        name = (body.get('name') or '').strip()[:100]
        text = (body.get('text') or '').strip()
        stars = int(body.get('stars') or 5)

        if not name or not text or not (1 <= stars <= 5):
            cur.close()
            conn.close()
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Заполните все поля'}, ensure_ascii=False)}

        cur.execute(
            "INSERT INTO reviews (name, text, stars) VALUES (%s, %s, %s)",
            (name, text, stars)
        )
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True}, ensure_ascii=False)}

    cur.close()
    conn.close()
    return {'statusCode': 405, 'headers': cors, 'body': ''}
