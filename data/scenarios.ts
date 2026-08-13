export type Option = {
  id: string;
  text_en: string;
  text_ms?: string;
};

export type Scenario = {
  id: string;
  order: number;
  scenario_text_en: string;
  scenario_text_ms?: string;
  timer_seconds?: number;
  warning_seconds?: number;
  options: Option[];
};

const scenarios: Scenario[] = [
  {
    id: "Q01",
    order: 1,
    scenario_text_en:
      "Q01: A major flight is delayed due to technical issues, causing a large passenger buildup at the terminal. As duty manager, what would you do first?",
    scenario_text_ms: "",
    timer_seconds: 240,
    warning_seconds: 60,
    options: [
      { id: "Q01-A", text_en: "Prioritise rebooking and passenger notifications." },
      { id: "Q01-B", text_en: "Call for additional ground staff and open extra service counters." },
      { id: "Q01-C", text_en: "Focus on technical team coordination to resolve the issue quickly." },
      { id: "Q01-D", text_en: "Arrange refreshments and manage passenger expectations proactively." },
    ],
  },
  {
    id: "Q02",
    order: 2,
    scenario_text_en: "Q02: Team conflict arises between two supervisors on shift. What is your first action?",
    timer_seconds: 240,
    warning_seconds: 60,
    options: [
      { id: "Q02-A", text_en: "Hold a private mediation with both supervisors." },
      { id: "Q02-B", text_en: "Reassign duties to reduce friction immediately." },
      { id: "Q02-C", text_en: "Escalate to HR for formal intervention." },
      { id: "Q02-D", text_en: "Observe interactions to gather more information first." },
    ],
  },
  {
    id: "Q03",
    order: 3,
    scenario_text_en: "Q03: A new digital kiosk rollout could save costs but upset some staff roles. How do you approach it?",
    timer_seconds: 240,
    warning_seconds: 60,
    options: [
      { id: "Q03-A", text_en: "Pilot the kiosk in one terminal and evaluate impact." },
      { id: "Q03-B", text_en: "Roll out quickly to capture cost savings immediately." },
      { id: "Q03-C", text_en: "Consult staff and redesign roles before launch." },
      { id: "Q03-D", text_en: "Delay and collect more data from vendors." },
    ],
  },
  {
    id: "Q04",
    order: 4,
    scenario_text_en: "Q04: Passenger feedback shows dissatisfaction with wayfinding. What do you prioritise?",
    timer_seconds: 240,
    warning_seconds: 60,
    options: [
      { id: "Q04-A", text_en: "Quick signage fixes and clearer maps." },
      { id: "Q04-B", text_en: "Commission a full user-experience audit." },
      { id: "Q04-C", text_en: "Train frontline staff to offer proactive guidance." },
      { id: "Q04-D", text_en: "Launch mobile wayfinding features." },
    ],
  },
  {
    id: "Q05",
    order: 5,
    scenario_text_en: "Q05: A commercial opportunity conflicts with a planned community event. What is your stance?",
    timer_seconds: 240,
    warning_seconds: 60,
    options: [
      { id: "Q05-A", text_en: "Find alternative commercial partners who fit community values." },
      { id: "Q05-B", text_en: "Prioritise the commercial revenue for the airport." },
      { id: "Q05-C", text_en: "Postpone the commercial deal to respect the event." },
      { id: "Q05-D", text_en: "Negotiate to adapt the commercial activation." },
    ],
  },
  {
    id: "Q06",
    order: 6,
    scenario_text_en: "Q06: A high-profile stakeholder raises a complaint about delays. How do you act?",
    timer_seconds: 240,
    warning_seconds: 60,
    options: [
      { id: "Q06-A", text_en: "Engage directly and offer a transparent plan." },
      { id: "Q06-B", text_en: "Refer them to the formal complaints process." },
      { id: "Q06-C", text_en: "Prioritise the stakeholderâ€™s case above others." },
      { id: "Q06-D", text_en: "Gather facts and brief senior leadership first." },
    ],
  },
  {
    id: "Q07",
    order: 7,
    scenario_text_en: "Q07: Sudden budget cut requires immediate triage. What is your first move?",
    timer_seconds: 240,
    warning_seconds: 60,
    options: [
      { id: "Q07-A", text_en: "Identify non-critical projects to pause." },
      { id: "Q07-B", text_en: "Spread cuts evenly across departments." },
      { id: "Q07-C", text_en: "Protect frontline operational budgets first." },
      { id: "Q07-D", text_en: "Request temporary emergency funding from HQ." },
    ],
  },
  {
    id: "Q08",
    order: 8,
    scenario_text_en: "Q08: Looking ahead, which initiative should shape the airport's future first?",
    timer_seconds: 240,
    warning_seconds: 60,
    options: [
      { id: "Q08-A", text_en: "Invest in sustainability and carbon reduction." },
      { id: "Q08-B", text_en: "Build digital passenger services for convenience." },
      { id: "Q08-C", text_en: "Expand commercial spaces to increase revenue." },
      { id: "Q08-D", text_en: "Focus on workforce training and capability building." },
    ],
  },
];

export default scenarios;
