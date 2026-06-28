import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Модерация отзывов для панели администратора Очки Плюс"""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    password = (event.get('headers') or {}).get('x-admin-password', '')
    if password != os.environ.get('ADMIN_PASSWORD', ''):
        return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'error': 'Неверный пароль'})}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if event.get('httpMethod') == 'GET':
        cur.execute("""
            SELECT id, name, text, stars, approved, created_at
            FROM reviews
            ORDER BY created_at DESC
        """)
        rows = cur.fetchall()
        reviews = [
            {'id': r[0], 'name': r[1], 'text': r[2], 'stars': r[3], 'approved': r[4], 'date': r[5].strftime('%d.%m.%Y %H:%M')}
            for r in rows
        ]
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'reviews': reviews}, ensure_ascii=False)}

    if event.get('httpMethod') == 'POST':
        body = json.loads(event.get('body') or '{}')
        review_id = int(body.get('id'))
        approved = bool(body.get('approved'))
        cur.execute("UPDATE reviews SET approved = %s WHERE id = %s", (approved, review_id))
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    if event.get('httpMethod') == 'DELETE':
        body = json.loads(event.get('body') or '{}')
        review_id = int(body.get('id'))
        cur.execute("DELETE FROM reviews WHERE id = %s", (review_id,))
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True})}

    cur.close()
    conn.close()
    return {'statusCode': 405, 'headers': cors, 'body': ''}
