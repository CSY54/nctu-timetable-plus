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

schema = {
    'id': 'cos_id',
    'name': 'cos_cname',
    'credit': 'cos_credit',
    'time': 'cos_time',
    'teacher': 'teacher'
}

courses = {}
for uuid in data:
    for courseType in data[uuid]:
        if courseType not in ['1', '2']:
            continue

        for acySemId in data[uuid][courseType]:
            course = data[uuid][courseType][acySemId]

            if course['cos_id'] in courses:
                for f, t in schema.items():
                    assert courses[course['cos_id']][f] == course[t]
            else:
                courses[course['cos_id']] = {}
                for f, t in schema.items():
                    courses[course['cos_id']][f] = course[t]

with open('parsed.json', 'w') as f:
    json.dump(courses, f)
