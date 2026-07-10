const templates = {
  linkedin: {
    type: "Outreach",
    title: "LinkedIn Messaging Template",
    fields: {
      firstName: "Alex",
      role: "Sr. AWS Engineer",
      location: "Fully Remote",
      company: "Major Cyber Security Company",
      strength: "AWS and DevOps background",
      compensation: "Market Rate"
    },
    body: ({ firstName, role, location, company, strength, compensation }) =>
`Hello ${firstName},

I am working directly with one of my clients on a ${role} opportunity with ${company}. The role is ${location}, and it looks like a strong fit with your ${strength}.

Role: ${role}
Location: ${location}
Compensation: ${compensation}

If you have interest in discussing, please send the best phone number to reach you.`
  },
  intro: {
    type: "Right to represent",
    title: "Intro Call Confirmation Email",
    fields: {
      firstName: "Alex",
      client: "Client Name",
      role: "SDET QA Lead",
      salary: "Market Rate",
      location: "Remote",
      website: "client.com"
    },
    body: ({ firstName, client, role, salary, location, website }) =>
`Hi ${firstName},

It was a pleasure discussing the opportunity with you. Please grant Mitchell Martin the right to represent you for the role below. In the meantime, please share two professional references.

Client: ${client}
Role: ${role}
Salary: ${salary}
Location: ${location}
Company website: ${website}

Please confirm that you would like Mitchell Martin to represent you for this opportunity.`
  },
  submittal: {
    type: "Account executive note",
    title: "Submittal Template",
    fields: {
      ae: "Account Executive",
      candidate: "Candidate Name",
      role: "Role",
      company: "Company",
      jobTitle: "Job Title",
      industry: "Industry or style of company",
      mustHave: "Must-have skill or responsibility",
      availability: "Immediately"
    },
    body: ({ ae, candidate, role, company, jobTitle, industry, mustHave, availability }) =>
`Hi ${ae},

Attached is the resume of ${candidate} for the ${role} at ${company}.

His/her qualifications include:
* Excellent experience as a ${jobTitle} for ${industry}
* Extensive experience with ${mustHave}
* Strong experience and knowledge with the must-haves for the job
* Excellent communication skills and available to interview ${availability}

Notes:
Visa Status:
Location (open to remote, hybrid, or onsite?):
Desired Base:
Desired Hourly Pay Rate:
Reason Leaving:
Reason for Gaps:
Reason for short-term stints:
Interview Availability:
Interview Activity:
When Candidate Can Start:
LinkedIn Profile:

Grade A Candidate Checklist:
MUST HAVES:
* Formatted resume that fits the job
* Tailored SOP pitch to the role
* Salary or rate within range of bill or salary

Include all that apply, minimum 3 needed:
* SOP verified references collected
* Former MMI consultant or perm placement
* Met with or video interviewed
* Ropes tested with good to great score`
  },
  submittalConfirmation: {
    type: "Right to represent",
    title: "Submittal Confirmation Template",
    fields: {
      firstName: "Alex",
      rate: "Rate or salary",
      client: "Client Name",
      website: "client.com",
      location: "Location"
    },
    body: ({ firstName, rate, client, website, location }) =>
`Hi ${firstName},

It was a pleasure discussing the opportunity with you. Please grant Mitchell Martin the right to represent you for the role below.

Salary/Hourly Rate: ${rate}
Client: ${client}
Company Website: ${website}
Location: ${location}

Attach Full Job Description here:

Prior to your first interview, please send back two managerial references with the information below:

Name:
Title:
Relationship:
Currently Working at:
Can you provide a LinkedIn for this person?
Work Phone #:
Work Email:

Please confirm receipt of this email that you approve all the information shown above.

Please reach out if you have any questions!`
  },
  confirmation: {
    type: "Interview logistics",
    title: "Interview Email Confirmation Template",
    fields: {
      firstName: "Alex",
      client: "Client Name",
      dateTime: "Thursday, September 1 at 2PM EST",
      interviewType: "Zoom",
      positionType: "FT or Contract",
      rate: "Rate or salary",
      manager: "Hiring Manager",
      phone: "Candidate phone"
    },
    body: ({ firstName, client, dateTime, interviewType, positionType, rate, manager, phone }) =>
`Subject: ${client} - ${interviewType} Interview Confirmation: ${dateTime} - PLEASE EMAIL ME BACK TO CONFIRM

Hey ${firstName},

You are confirmed for your ${interviewType} interview with ${client} on ${dateTime}.

Below are the details:
Position Type: ${positionType}
Rate/salary confirmed: ${rate}
Date/Time: ${dateTime}
Hiring Manager: ${manager}
Number Provided: ${phone}
Interview Type: ${interviewType}

Notes Direct from Hiring Manager for the Role:
Job Spec:

Prior to the interview, please send two managerial references with the following information provided:

Name:
Title:
Relationship:
Did you directly report to this person?
Is this person still with company?
If not, do you know where they are now?
Currently working at:
Can you provide a LinkedIn for this person?
Are you sure these numbers/emails are correct?
Work Phone #:
Work Email:

Please call me directly after the interview for a debrief. It is important that we speak before we speak with the client.

Please confirm receipt of this email and of course reach out with any questions!`
  },
  interviewPrep: {
    type: "Candidate prep",
    title: "Interview Prep Template",
    fields: {
      position: "Position",
      date: "Interview date",
      client: "Client Name"
    },
    body: ({ position, date, client }) =>
`Interview Prep Form

Position: ${position}
Date of Interview: ${date}
Client: ${client}

Job & Role Understanding:
Can you summarize the job in your own words?
What excites you most about the position?
What are the top three skills you have that match the requirements?
Does compensation align with your current compensation and future outlook?

Company Knowledge:
What do you know about the company?
Why do you want to work for the company in particular?

Interview Strategy:
What experiences or projects will you highlight?
What questions do you plan on asking the interviewer?

Profile:
Is your resume and LinkedIn aligned with what you will discuss?

Pre-Close:
What other opportunities, submittals, interviews, etc. do you have in the pipeline right now?
Where are you in the process?
How does this opportunity rank?
Confirm compensation/rate.
If permanent, would there be potential for a counteroffer and how would you respond?
Confirm a follow-up time post-interview for debrief with AE/Recruiter.`
  },
  debrief: {
    type: "Post-interview",
    title: "Interview Debrief/Pre-Closing Template",
    fields: {
      candidate: "Candidate Name",
      role: "Role"
    },
    body: ({ candidate, role }) =>
`Interview Debrief/Pre-Closing Template

Candidate: ${candidate}
Role: ${role}

* How did the interview go? How do you feel you did personally?

* How long did the interview last?

* Was the prep I gave you helpful for this interview? What else do you wish you would have known?

* What specific questions did they ask you and what were your responses?

* Was there anything they asked you that you had difficulty answering or could not answer?

* What did you do well on? What was easy for you to answer?

* Who did you interview with? What was their role?

* Were there any next steps discussed?

* Are you still interested in this role after your interview?

* Is this still a top priority, second, third? Why?

* Where does this compare to other roles you are interviewing for? Get specifics on other roles (how many, which round for each/do they have other offers, their preference, rates).

* If offered the position, would you accept? Can I accept on your behalf?

* When can you start, should you get the offer and accept?

* For FTE Candidates- Have you thought about getting a counteroffer? Would you consider taking the counteroffer?

* If you accept, will you be ending your interview process?

* Availability to interview the rest of the week:`
  }
};

const prepContent = {
  prep: {
    title: "Prep flow",
    body: "Talk through who they are interviewing with, client must-haves, related experience, logistics, next steps, and a scheduled debrief follow-up time.",
    bankTitle: "Prep checklist",
    prompts: [
      "Sell the company, interviewers, culture, and opportunity.",
      "Discuss client must-haves and the candidate's matching experience.",
      "Reconfirm interview logistics and confirmation email resources.",
      "If second interview: ask when they are specifically available.",
      "If offer: ask whether Mitchell Martin can accept on their behalf.",
      "Put the debrief follow-up time on the calendar before ending."
    ]
  },
  probing: {
    title: "Probing questions",
    body: "Use prep to uncover motivation, fit, remote expectations, notice requirements, and possible concerns before the client conversation.",
    bankTitle: "Good probing prep questions",
    prompts: [
      "If remote, talk through workspace, flexibility, and expectations.",
      "Talk me through challenging scenarios you have had at work and how you overcame them.",
      "What will you do to stand out in this interview?",
      "How do your skills align with this role and company?",
      "Do you have PTO or notice required from your current role?",
      "What is your biggest motivating factor in taking a new role?",
      "Do you have any concerns with your ability to do the job?"
    ]
  },
  preclose: {
    title: "Pre-close",
    body: "Confirm interest, rate, start timing, offer readiness, and where this role ranks before the interview happens.",
    bankTitle: "Pre-closing questions",
    prompts: [
      "What else do you have in the mix?",
      "How does this role rank with other potentials?",
      "On a scale of 1-10, how interested are you in the role?",
      "Can we accept on your behalf?",
      "When can you start?",
      "What excites you most about this opportunity?",
      "Is there a possibility for an extension or counteroffer?",
      "Confirm the rate."
    ]
  },
  debrief: {
    title: "Debrief",
    body: "After the interview, ask open-ended questions, re-check close readiness, capture notes in JobDiva, and set expectations for a tailored thank you note.",
    bankTitle: "Candidate debrief questions",
    prompts: [
      "How long did the interview last?",
      "How did they feel it went on a scale of 1-10?",
      "What specific questions were asked?",
      "What aspects of the interview went well?",
      "Were there areas you did not feel confident?",
      "Are you still interested in the role? Why or why not?",
      "Did they mention next steps?",
      "How does this rank now with other opportunities?"
    ]
  },
  closing: {
    title: "Closing mindset",
    body: "Closing starts on the first call. Know the candidate's pain points, reference them back to their needs, and sell the role actively.",
    bankTitle: "Close-forward reminders",
    prompts: [
      "Set your expectations in the first candidate call.",
      "Take strong notes on pain points, wants, and needs.",
      "Know your candidate well enough to sell them the role.",
      "Use the debrief to identify gaps and sell through them.",
      "Use references, thank you notes, and testimonials as support.",
      "Your job is to sell the role, not just be passive."
    ]
  }
};

const offers = {
  w2: ["Tentative start", "Location", "Duration", "Rate", "Legal full name", "Mailing address", "Mobile phone", "Social Security number", "Visa status", "Visa expiration", "Date of birth", "2 supervisory references"],
  c2c: ["Tentative start", "Location", "Duration", "Rate", "Candidate legal name", "Candidate mailing address", "Candidate mobile phone", "Social Security number", "Visa status", "Visa expiration", "Date of birth", "C2C name", "C2C EIN", "Signer name", "Signer email", "Company address", "2 supervisory references"],
  fte: ["Legal full name", "Mailing address", "Mobile phone", "Email address", "Start date"]
};

const jobFlow = {
  qualification: {
    owner: "Sales",
    title: "Qualification",
    summary: "Sales qualifies the requirement by phone and includes recruiting or sales leadership when needed.",
    note: "For new salespeople or new clients, leader involvement and approval are mandatory.",
    steps: [
      ["Send job order", "Sales sends the job order to JobQue using the Job Order Form."],
      ["Qualify requirements", "Sales qualifies the requirement by phone and should include a recruiter, recruiting leader, or sales leader."],
      ["Approve requirement", "Sales leader approval is mandatory for new salespeople and new clients."],
      ["Rank the job", "Use job ranking to decide priority and delivery focus."]
    ]
  },
  assignment: {
    owner: "Delivery Leader + Recruiter",
    title: "Assignment",
    summary: "The job moves from sales to delivery, then to the recruiter with a clear assignment conversation.",
    note: "Once understanding is clear, the recruiter proceeds with next steps.",
    steps: [
      ["Present the job", "Salesperson presents the job to the Delivery Leader."],
      ["Assign recruiter", "Delivery Leader assigns the position to a recruiter."],
      ["Discuss clarity", "Use the initial req discussion form to align before recruiting.", "Salesperson and Recruiter Initial Req Discussion.docx"],
      ["Confirm ownership", "Follow candidate ownership rules before outreach and submission.", { label: "Ownership rules", href: "#ownership" }]
    ]
  },
  submission: {
    owner: "Recruiter + Sales",
    title: "Submission Process",
    summary: "Recruiter submits the candidate with a proper pitch and resume format, then sales decides whether to send to the client.",
    note: "Allow 2 business days for contract submittals and up to 5 business days for full-time submittals.",
    steps: [
      ["Build submission", "Recruiter submits the candidate with the proper pitch and resume format."],
      ["Sales review", "Sales decides whether to forward the submission to the client and cc or bcc the recruiter if applicable."],
      ["Respond fast", "Sales should respond within one business day; recruiter follows up before escalating to recruiting leadership."],
      ["Confirm candidate", "Recruiter sends the candidate submission confirmation email."],
      ["Track in Diva", "Recruiter tracks the submittal in JobDiva."]
    ]
  },
  interview: {
    owner: "Recruiter + Sales",
    title: "Interview Process",
    summary: "Recruiter confirms interview readiness, availability, references, and JobDiva tracking while sales moves availability to the client.",
    note: "Video interview with the candidate before the client interview and JobDiva logging are mandatory. Live interview is recommended.",
    steps: [
      ["Video screen", "Complete and log the candidate video interview in JobDiva."],
      ["Get availability", "Recruiter obtains candidate availability using the availability template."],
      ["Forward to client", "Sales forwards availability to the client and cc or bccs the recruiter."],
      ["Confirm interview", "Recruiter sends interview confirmation to the candidate and cc or bccs sales."],
      ["Prep and track", "Sales prepares the candidate; recruiter tracks the interview and prep in JobDiva."],
      ["Verify references", "Recruiter obtains verified references before the first interview and adds them to Diva."]
    ]
  },
  close: {
    owner: "Sales leads with Recruiter involved",
    title: "Debrief & Closing",
    summary: "Sales conducts the debrief with the recruiter unless specified otherwise, then leads closing with recruiter involvement.",
    note: "Sales must check at least one reference in Diva before a final interview.",
    steps: [
      ["Candidate debrief", "Use the Candidate Interview Debrief Guide to capture feedback, interest, and close readiness."],
      ["Client debrief", "Use the Client Interview Debrief Guide to understand client feedback and next steps."],
      ["Track debrief", "Sales tracks the debrief close in JobDiva."],
      ["Lead the close", "Sales leads the closing process; recruiter is involved and either or both can support the approach."]
    ]
  },
  postclose: {
    owner: "Recruiting + Sales",
    title: "Post Close",
    summary: "After offer acceptance, recruiting and sales clean up candidate, assignment, and job details before onboarding and retention.",
    note: "Retention connects are completed monthly by the recruiter.",
    steps: [
      ["Candidate info", "Recruiting confirms and corrects all candidate information in JobDiva."],
      ["Start record", "Recruiting creates the Start Record in JobDiva."],
      ["Job details", "Sales confirms and corrects job details in JobDiva, including work location and manager."],
      ["Work setup", "Sales confirms whether the offer is hybrid, remote, or onsite."],
      ["Assignment record", "Once the offer is accepted, recruiter begins the Assignment Record and initiates the deal in JobDiva."],
      ["Retention", "Recruiter completes monthly retention connects and tracks consultant satisfaction."]
    ]
  }
};

const dealStart = {
  contract: {
    type: "Contract Deal",
    title: "Initiating a Deal in JobDiva",
    summary: "Recruiting confirms candidate information and starts onboarding; sales completes the bill side, then recruiting completes the pay side.",
    note: "If the deal is a direct placement, use the Invoice Placement path. For untraditional deals, reach out to recruiting leadership.",
    download: "Initiating a Deal in JobDiva.pdf",
    steps: [
      "Recruiting confirms and corrects candidate information",
      "Recruiting sets the start date in JobDiva",
      "Recruiting emails users on the start",
      "Sales confirms job title, work location, manager, and remote/onsite status",
      "Sales completes the bill side of the assignment record",
      "Recruiting completes the pay side after bill side completion email",
      "Review COBs on the Assignment Dashboard as needed"
    ]
  },
  fulltime: {
    type: "Full-Time Deal",
    title: "Invoice Placement",
    summary: "After generating a start record, go to the Invoice Placement tab on the candidate page.",
    note: "Review and fill out placement type, start date, work location, billing contact, salary, fee, commission credit, and any additional notes.",
    download: "Invoice Placement.pdf",
    steps: [
      "Generate the start record",
      "Open the candidate page",
      "Go to Invoice Placement",
      "Review placement type",
      "Confirm start date and work location",
      "Add billing contact",
      "Enter salary and fee",
      "Add commission credit and notes"
    ]
  },
  extension: {
    type: "Extensions & Rate Changes",
    title: "Assignment Record",
    summary: "Use the Assignment Record envelope flow when entering an extension or rate change.",
    note: "Email support@itmmi.com from the assignment record envelope button. In the subject line, identify whether it is an extension or rate change.",
    download: "Assignment Record.pdf",
    steps: [
      "Open the assignment record",
      "Click the envelope button",
      "Email support@itmmi.com",
      "Include extension or rate change in the subject",
      "Support creates or updates the assignment",
      "Support emails onboarding based on division",
      "Onboarding handles the contract/process",
      "Finance is notified if needed"
    ]
  },
  conversion: {
    type: "Conversions / Contract to Hire",
    title: "Logging Contract to Hire",
    summary: "Convert the existing assignment record to a direct placement by terminating the current contract and creating a new direct placement start.",
    note: "After creating the new start, go to Invoice Placement and choose Conversion under placement type.",
    download: "Logging Contract to Hire.pdf",
    steps: [
      "Log the termination date of the consultant's current contract",
      "Go into activities and click Start",
      "Choose the original job for the start",
      "Select Direct Placement",
      "Create the new start",
      "Go to Invoice Placement",
      "Choose Conversion under Placement Type",
      "Complete the remaining invoice placement rules"
    ]
  }
};

const state = {
  template: "linkedin",
  values: {}
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function showToast(message) {
  const toast = $(".toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function renderTemplate() {
  const item = templates[state.template];
  $("#templateType").textContent = item.type;
  $("#templateTitle").textContent = item.title;
  const values = { ...item.fields, ...(state.values[state.template] || {}) };
  $("#templateOutput").textContent = item.body(values);
  $("#templateFields").innerHTML = Object.entries(item.fields).map(([key, value]) => `
    <label>
      ${key.replace(/([A-Z])/g, " $1").replace(/^./, char => char.toUpperCase())}
      <input data-field="${key}" value="${values[key] ?? value}" />
    </label>
  `).join("");
}

function renderOffer(type = "w2") {
  $("#offerGrid").innerHTML = offers[type].map((field, index) => `
    <div class="offer-item">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${field}</strong>
    </div>
  `).join("");
}

function renderJobFlow(key = "qualification") {
  const item = jobFlow[key];
  if (!item) return;
  $("#processOwner").textContent = `Owner: ${item.owner}`;
  $("#processTitle").textContent = item.title;
  $("#processSummary").textContent = item.summary;
  $("#processNote").textContent = item.note;
  $("#processList").innerHTML = item.steps.map(([title, detail, download], index) => `
    <div class="process-step">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${title}</strong>
      <small>${detail}</small>
      ${download ? renderStepAction(download) : ""}
    </div>
  `).join("");
}

function renderStepAction(action) {
  if (typeof action === "string") {
    return `<a class="mini-download" href="./reference-library/${action}" download>Download form</a>`;
  }
  return `<a class="mini-download" href="${action.href}" ${action.download ? "download" : ""}>${action.label}</a>`;
}

function renderDealStart(key = "contract") {
  const item = dealStart[key];
  if (!item) return;
  $("#dealType").textContent = item.type;
  $("#dealTitle").textContent = item.title;
  $("#dealSummary").textContent = item.summary;
  $("#dealNote").textContent = item.note;
  $("#dealDownload").innerHTML = `<a class="download-button" href="./reference-library/${item.download}" download><svg><use href="#icon-copy"/></svg>Download this path</a>`;
  $("#dealSteps").innerHTML = item.steps.map((step, index) => `
    <div class="deal-step">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${step}</strong>
    </div>
  `).join("");
}

function updateRisk() {
  const checked = $$("[data-risk]:checked").length;
  $("#riskScore").textContent = checked;
  $(".risk-meter").style.setProperty("--score", checked);
}

function filterTemplates(query) {
  const q = query.trim().toLowerCase();
  $$(".tab").forEach(tab => {
    const key = tab.dataset.templateTab;
    const text = `${templates[key].title} ${templates[key].type} ${Object.keys(templates[key].fields).join(" ")}`.toLowerCase();
    tab.hidden = q && !text.includes(q);
  });
}

document.addEventListener("click", async event => {
  const tab = event.target.closest("[data-template-tab]");
  if (tab) {
    state.template = tab.dataset.templateTab;
    $$(".tab").forEach(item => item.classList.toggle("active", item === tab));
    renderTemplate();
  }

  const prep = event.target.closest("[data-prep]");
  if (prep) {
    $$(".prep-card").forEach(item => item.classList.toggle("active", item === prep));
    const content = prepContent[prep.dataset.prep];
    $("#prepTitle").textContent = content.title;
    $("#prepBody").textContent = content.body;
    $("#prepBankTitle").textContent = content.bankTitle;
    $("#prepBank").innerHTML = content.prompts.map(prompt => `<button>${prompt}</button>`).join("");
  }

  const offer = event.target.closest("[data-offer]");
  if (offer) {
    $$(".offer-switch button").forEach(item => item.classList.toggle("active", item === offer));
    renderOffer(offer.dataset.offer);
  }

  const process = event.target.closest("[data-process]");
  if (process) {
    $$(".process-tabs button").forEach(item => item.classList.toggle("active", item === process));
    renderJobFlow(process.dataset.process);
  }

  const deal = event.target.closest("[data-deal]");
  if (deal) {
    $$(".deal-chooser button").forEach(item => item.classList.toggle("active", item === deal));
    renderDealStart(deal.dataset.deal);
  }

  const copy = event.target.closest("[data-copy]");
  if (copy) {
    const target = $(copy.dataset.copy);
    try {
      await navigator.clipboard.writeText(target.textContent);
      showToast("Copied to clipboard");
    } catch {
      const range = document.createRange();
      range.selectNodeContents(target);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      showToast("Selected text for copying");
    }
  }

  if (event.target.closest("[data-theme]")) {
    document.body.classList.toggle("dark");
  }
});

document.addEventListener("input", event => {
  if (event.target.matches("[data-field]")) {
    const key = event.target.dataset.field;
    state.values[state.template] = {
      ...(state.values[state.template] || {}),
      [key]: event.target.value
    };
    const item = templates[state.template];
    const values = { ...item.fields, ...state.values[state.template] };
    $("#templateOutput").textContent = item.body(values);
  }

  if (event.target.matches("[data-risk]")) {
    updateRisk();
  }

  if (event.target.matches("#templateSearch")) {
    filterTemplates(event.target.value);
  }
});

renderTemplate();
renderOffer();
renderJobFlow();
renderDealStart();
updateRisk();
