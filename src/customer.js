import {clean,lines,selected,requireText,number,pence,pounds,section,report,enumValue,webAddress} from './customer-ui.js';
export const config = {
  "title": "Vet New Client Journey Planner",
  "short": "Make the first visit easier to arrange",
  "audience": "For veterinary practice owners and managers",
  "summary": "Plan clear registration, routine booking and out-of-hours information for people finding your practice for the first time.",
  "button": "Build my new-client plan",
  "filename": "vet-new-client-journey",
  "eyebrow": "A welcoming first step for new clients.",
  "time": "About 5 minutes",
  "outcome": "A practical website brief your reception team can review and use.",
  "layout": "practice",
  "intro": "Use the practice’s actual arrangements. This plans the information your website should explain; it does not register a client or request treatment.",
  "note": "This is an administrative planning tool, not veterinary advice or triage. Use only practice-approved urgent and out-of-hours instructions.",
  "fields": [
    {
      "id": "business",
      "label": "Practice name",
      "help": "",
      "required": true,
      "type": "text",
      "maxLength": 180
    },
    {
      "id": "species",
      "label": "Which animals does the practice actually see?",
      "options": [
        "Dogs",
        "Cats",
        "Small pets",
        "Equine",
        "Farm animals",
        "Exotics"
      ],
      "help": "",
      "type": "checks",
      "wide": true
    },
    {
      "id": "registration",
      "label": "How should a new client start?",
      "options": [
        [
          "online",
          "Use the practice’s existing online registration"
        ],
        [
          "phone",
          "Call reception to discuss registration"
        ],
        [
          "enquiry",
          "Send a registration enquiry"
        ]
      ],
      "help": "",
      "required": true,
      "type": "select"
    },
    {
      "id": "routine",
      "label": "How are routine appointments arranged?",
      "options": [
        [
          "online",
          "Existing online booking service"
        ],
        [
          "phone",
          "Call reception"
        ],
        [
          "request",
          "Send an appointment request for confirmation"
        ]
      ],
      "help": "",
      "required": true,
      "type": "select"
    },
    {
      "id": "branches",
      "label": "How many branches should the website explain?",
      "options": [
        [
          "one",
          "One branch"
        ],
        [
          "multiple",
          "More than one branch"
        ]
      ],
      "help": "",
      "required": true,
      "type": "select"
    },
    {
      "id": "branchInfo",
      "label": "What should a new visitor know about choosing or finding a branch?",
      "help": "Use approved details. For example: branch selection, parking or access arrangements.",
      "required": false,
      "type": "textarea",
      "maxLength": 2500,
      "wide": true
    },
    {
      "id": "urgent",
      "label": "Practice-approved urgent and out-of-hours instructions",
      "help": "Paste only wording approved by the practice, including the real contact route. Leave blank if it still needs approval.",
      "required": false,
      "type": "textarea",
      "maxLength": 2500,
      "wide": true
    },
    {
      "id": "prepare",
      "label": "What should reception explain before the first appointment?",
      "help": "For example: the information needed for registration or how existing records are requested. Do not enter client or animal records.",
      "required": false,
      "type": "textarea",
      "maxLength": 2500,
      "wide": true
    }
  ],
  "example": {
    "business": "Example Veterinary Practice",
    "species": [
      "Dogs",
      "Cats",
      "Small pets"
    ],
    "registration": "phone",
    "routine": "request",
    "branches": "multiple",
    "branchInfo": "Choose the appropriate branch and check its actual address, opening hours and access information.",
    "urgent": "",
    "prepare": "Reception explains registration and how previous records are requested where appropriate."
  }
};
export function evaluate(v){const species=selected(v.species);if(!species.length)throw Error('Choose at least one animal group the practice sees.');enumValue(v.registration,['online','phone','enquiry'],'the registration route');enumValue(v.routine,['online','phone','request'],'the routine booking route');enumValue(v.branches,['one','multiple'],'the branch arrangement');const register={online:'Action: Register with the practice. Link to the actual registration service and explain any review or confirmation step.',phone:'Action: Call reception about registration. Show the actual reception number and opening arrangements.',enquiry:'Action: Ask about joining the practice. Explain that sending an enquiry does not complete registration.'}[v.registration],booking={online:'Action: Book a routine appointment. Link to the actual booking service and explain any limitations approved by the practice.',phone:'Action: Call reception for routine appointments. Put the correct branch contact beside this action.',request:'Action: Request a routine appointment. State clearly that the practice must confirm the appointment.'}[v.routine];return report(requireText(v.business,'your practice name')+': new-client website plan','A reception-led brief based on the practice arrangements you supplied.',[section('Who can register',['Animal groups: '+species.join(', '),register]),section('Routine appointments',[booking,'Keep urgent and out-of-hours information clearly separate from routine booking.']),section(v.branches==='multiple'?'Help clients choose a branch':'Help clients find the practice',[clean(v.branchInfo)||(v.branches==='multiple'?'Give each branch its actual contact details, hours and directions. Make branch selection clear before a client calls or books.':'Provide the actual address, opening arrangements, directions and access information.')]),section('Urgent and out-of-hours information',clean(v.urgent)?['Supplied practice-approved wording: '+clean(v.urgent),'Have the practice confirm this wording and contact route again before publication.']:['No approved wording supplied. Ask the responsible practice team to provide the actual urgent and out-of-hours instructions.','Do not publish a guessed emergency number or let a routine enquiry form appear to be an urgent-care route.']),section('Before the first appointment',lines(v.prepare).length?lines(v.prepare):['Ask reception what registration information and appointment preparation they actually need to explain.']),section('Reception-team review',['Confirm all contact details, branch routing, registration and booking arrangements.','Check the journey on a phone and arrange a controlled test of enquiry delivery.','Do not promise clinical outcomes, availability or registration acceptance that the practice has not confirmed.'])]);}
