- User
    - role (mentor/mentee)
    - name
    - rating
    - available
    - summary
    - timezone
    - min-budget
    - max-budget
    - isVerified
    - years-of-work-experience
    - matched-to

- User-Language
- User-Skill
    - years-of-experience
- User-Timezone

- User-priority
    - language (int in range 0 to max criteria)
    - skill
    - timezone
    - budget

- Language
- Skill
- Timezone
- Budget

Criteria: language (multi choice), skill (multi), timezone (multi), budget (range), isVerified(single choice), weekly-availability (hours range)

Questions in UI (prioritizable):
- mentee
    - select languages you know
    - select skills you want to learn
    - select min and max budget per session
    - select timezone
- mentor
    - select languages you know
    - select skills you have experience in
    - select fee per session
    - select timezone

- Features
    - supports single match
    - single choice criteria

- Other types of matchings
	- Criterias in order of priority
	- range (match number in range then variance from range)
	- Extract keywords from summary and other texts and match