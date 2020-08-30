from requests import post
import json

'''
data = {
    "m_acy": "109",
    "m_sem": "1",
    "m_acyend": "109",
    "m_semend": "1",
    "m_dep_uid": "**",
    "m_group": "**",
    "m_grade": "**",
    "m_class": "**",
    "m_option": "**",
    "m_crsname": "**",
    "m_teaname": "**",
    "m_cos_id": "**",
    "m_cos_code": "**",
    "m_crstime": "**",
    "m_crsoutline": "**",
    "m_costype": "**",
}

r = post('https://timetable.nctu.edu.tw/?r=main/get_cos_list', data=data, headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36"})

data = json.loads(r.text)
with open('data.json', 'w') as f:
    json.dump(data, f)
'''

with open('data.json', 'r') as f:
    data = json.load(f)

courses = {}
for uuid in data:
    for courseType in data[uuid]:
        '''
        1: 主開
        2: 輔開
        '''
        if courseType not in ['1', '2']:
            continue

        for acySemId in data[uuid][courseType]:
            course = data[uuid][courseType][acySemId]

            courses[course['cos_id']] = {
                'id': course['cos_id'],
                'name': course['cos_cname'],
                'credit': course['cos_credit'],
                'time': course['cos_time'],
                'title': course['teacher'],
                'type': course['cos_type'] == '必修',
                'teacher': course['teacher'],
            }

with open('parsed.json', 'w') as f:
    json.dump(courses, f)
