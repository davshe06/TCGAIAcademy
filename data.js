/* =========================================================================
   AI Fluency Academy — all training content lives here.
   Content reviewed November 2026. AI tools change monthly: re-check product
   names and availability each quarter (see README "Keeping content current").

   Quiz format: { q, o: [correct, wrong, wrong, wrong], why }
   The FIRST option is always the correct one; the app shuffles at runtime.
   ========================================================================= */

const CONTENT_DATE = "November 2026";

const MODULES = [
  /* ------------------------------------------------------------------ */
  {
    id: "basics", sym: "Ai", name: "The Big Shift", hue: 255,
    tag: "What changed, the vocabulary, and a ladder for sizing up AI fluency.",
    cards: [
      { t: "From autocomplete to agents", p: [
        "In three years AI moved through three stages. First came <b>chat assistants</b> you ask for a draft. Then <b>copilots</b> built into every tool your clients already use. Now <b>agents</b> take a goal and carry out many steps on their own: research, build, check, revise.",
        "For marketing and creative teams, the work is shifting from <i>making every asset by hand</i> to <i>directing, reviewing and refining</i> what AI produces."] },
      { t: "Three layers you will hear about", l: [
        "<b>General assistants</b>: ChatGPT, Claude, Gemini, Microsoft Copilot. Used for drafting, research, analysis and brainstorming.",
        "<b>Embedded AI</b>: features inside the tools of the trade. Figma, Adobe Creative Cloud, HubSpot, Salesforce, Articulate.",
        "<b>Agents and connectors</b>: AI that acts across tools. MCP (Model Context Protocol) is the common plug that lets an AI assistant read and act inside Figma, a CRM or a codebase."] },
      { t: "Tasks got automated, not jobs", p: [
        "AI is strongest at production tasks: first drafts, resizing, versioning, boilerplate code, summarizing research. That compresses junior, production-heavy work.",
        "What gained value: <b>judgment, taste, strategy, systems thinking and quality control</b>. Robert Half's 2026 research found 78% of marketing and creative leaders pay more for specialized skills. AI fluency is now one of them."] },
      { t: "The AI Fluency Ladder", p: ["A simple model for placing a candidate, or describing what a client needs:"], l: [
        "<b>Level 0, Avoider</b>: does not use AI.",
        "<b>Level 1, Dabbler</b>: asks a chatbot for drafts now and then.",
        "<b>Level 2, Practitioner</b>: AI is part of the daily workflow, with repeatable prompts and a review habit.",
        "<b>Level 3, Builder</b>: creates reusable assets for the team. Custom GPTs, prompt libraries, templates, automations, agents.",
        "<b>Level 4, Leader</b>: sets policy, measures impact, trains others."] },
      { t: "The risks clients worry about", l: [
        "<b>Hallucination</b>: confident, wrong output. Someone must fact-check.",
        "<b>IP and copyright</b>: who owns the output, and what was the model trained on? Hence the phrase \"commercially safe\".",
        "<b>Data privacy</b>: client data pasted into unapproved tools.",
        "<b>Brand consistency</b>: generic, off-voice, same-as-everyone work.",
        "The standard answer to all four is a <b>human in the loop</b>: a skilled person who reviews before anything ships."] }
    ],
    tools: [
      ["ChatGPT", "OpenAI", "The best-known general assistant. Custom GPTs let teams package a prompt and reference files."],
      ["Claude", "Anthropic", "General assistant popular for writing, analysis and coding. Projects hold brand guides and files."],
      ["Gemini", "Google", "Google's assistant, built into Workspace (Docs, Sheets, Gmail). Gems are its reusable custom versions."],
      ["Microsoft Copilot", "Microsoft", "AI across Word, Excel, PowerPoint, Teams and Outlook. Common in large enterprises."],
      ["Perplexity", "Perplexity", "An answer engine: AI search with cited sources. Matters for research and for AEO."],
      ["MCP", "Open standard", "Model Context Protocol. Lets AI assistants connect to tools like Figma, CRMs and code repositories."]
    ],
    roles: ["AI Program / Enablement Manager", "Marketing Technologist", "Creative Technologist", "AI Operations Lead"],
    skills: ["Prompting with context and examples", "Reviewing and fact-checking output", "Knowing which tool fits which task", "Data and IP hygiene"],
    client: [
      "How has AI changed what this team does day to day over the last year?",
      "Which AI tools are approved here, and which are off limits?",
      "Is this role expected to use AI, to build AI workflows for others, or to lead the strategy?",
      "Who reviews AI-assisted work before it goes out?"],
    cand: [
      "Which AI tools do you use in a normal week, and for what?",
      "Tell me about a time AI got it wrong. How did you catch it?",
      "Have you built anything other people on your team reuse?",
      "Where do you choose not to use AI?"],
    green: ["Names specific tools and tasks", "Describes a review step", "Knows the limits"],
    red: ["Buzzwords with no example", "\"I use AI for everything\"", "Pastes client data into any tool"],
    quiz: [
      { q: "A client says they want \"agents\". What separates an agent from a chat assistant?",
        o: ["It carries out multi-step work toward a goal, not just a single reply", "It is always more accurate", "It needs no human review", "It only works inside Microsoft products"],
        why: "Agents plan and act across several steps and tools. They still need guardrails and review." },
      { q: "A candidate built a prompt library and a custom GPT that their whole team uses. Where do they sit on the Fluency Ladder?",
        o: ["Level 3, Builder", "Level 1, Dabbler", "Level 2, Practitioner", "Level 0, Avoider"],
        why: "Creating reusable AI assets for other people is the mark of a Builder." },
      { q: "Which kind of work has AI compressed the most?",
        o: ["Production tasks like first drafts, resizing and versioning", "Brand strategy and positioning", "Client relationships", "Creative direction and taste"],
        why: "Production got faster. Judgment, taste and strategy became more valuable." },
      { q: "What is MCP, in plain terms?",
        o: ["A standard plug that lets AI assistants connect to other tools", "A marketing certification", "Adobe's image model", "A type of résumé format"],
        why: "Model Context Protocol connects assistants to tools like Figma, CRMs and codebases so they can read and act there." },
      { q: "A client worries about AI \"making things up\" in published content. Which term describes that, and what is the usual safeguard?",
        o: ["Hallucination; a human in the loop who fact-checks", "Tokenization; a bigger budget", "Fine-tuning; a faster model", "Zero-click; more ads"],
        why: "Hallucination is confident, wrong output. Human review is the standard control." }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "ux", sym: "Ux", name: "UX and Product Design", hue: 285,
    tag: "Figma Make, Figma's AI, and why designers now ship working prototypes.",
    cards: [
      { t: "The canvas now builds", p: [
        "Figma is still the home of UX work, but it is no longer only a drawing tool. <b>Figma Make</b> turns a prompt or an existing design into a working, clickable app. <b>Figma's AI and agent</b> generate and edit layouts, rename layers, write copy, search files and run repeatable team commands.",
        "At Config 2026, Figma added code layers, built-in motion and prompt-built plugins to the canvas. Several of those are still in beta or rolling out, so say \"announced\" unless you know a client has them."] },
      { t: "Mock-ups became prototypes", p: [
        "A designer used to hand over static screens. Now a strong designer can show a <b>working prototype in an afternoon</b> and test it with users the same week.",
        "That raises the bar. Clients expect faster exploration, more options, and ideas validated before engineering time is spent."] },
      { t: "The design and code line is blurring", p: [
        "Figma's <b>MCP server</b> and Dev Mode feed real design details to coding agents like Claude Code and Cursor, so code matches the design more closely.",
        "This created demand for the <b>design engineer</b>: someone who designs and ships front-end code. It also made <b>design systems</b> more valuable, because AI only produces on-brand work when it has components and tokens to draw from."] },
      { t: "What still needs a human", l: [
        "Framing the right problem and understanding users.",
        "Taste: knowing which of twenty generated options is good.",
        "Accessibility, edge cases and consistency with the system.",
        "Research judgment. AI can summarize interviews (Dovetail, Maze), but it can miss or invent themes."] }
    ],
    tools: [
      ["Figma Make", "Figma", "Prompt-to-app. Turns a description or a Figma design into a working prototype you can click and share."],
      ["Figma AI / Figma agent", "Figma", "In-canvas assistant: generate and edit designs, rename layers, write copy, run team \"skills\"."],
      ["Figma MCP server", "Figma", "Gives coding agents (Claude Code, Cursor, Codex) accurate design context for design-to-code."],
      ["v0", "Vercel", "Prompt-to-UI and app builder that outputs real React code. Popular with designers who prototype in code."],
      ["Lovable", "Lovable", "Prompt-to-app builder used for fast product prototypes and simple internal tools."],
      ["Dovetail", "Dovetail", "Research repository with AI that summarizes interviews and clusters themes."]
    ],
    roles: ["Product Designer (AI-native)", "Design Engineer", "Design Systems Lead", "AI Experience / Conversation Designer", "UX Researcher", "Content Designer"],
    skills: ["Prompt-to-prototype (Figma Make, v0)", "Design systems and tokens", "Designing AI features: chat, agents, trust and error states", "Research synthesis with AI, verified by hand"],
    client: [
      "Where does AI sit in your design process today: exploration, prototyping or production?",
      "Do you have a design system, and is it set up so AI tools can use it?",
      "Do you expect designers to deliver working prototypes or code, or static designs?",
      "Is the product itself AI-powered? Do you need someone who has designed chat or agent experiences?",
      "Which AI tools has security approved for the design team?"],
    cand: [
      "Walk me through a recent project. Where did AI touch it, and where did you leave it out on purpose?",
      "Have you taken an idea to a working prototype with Figma Make or a similar tool? Can you show me?",
      "How do you keep AI-generated screens consistent with the design system?",
      "When AI summarizes your research, how do you check it?"],
    green: ["Shows process and outcomes, not only polish", "Talks about testing prototypes with users", "Understands design systems"],
    red: ["Generic AI-looking screens with no problem statement", "Cannot explain decisions", "Treats AI summaries as research findings"],
    quiz: [
      { q: "What does Figma Make do?",
        o: ["Turns a prompt or design into a working, clickable prototype or app", "Removes image backgrounds", "Tracks brand mentions in AI search", "Schedules design reviews"],
        why: "Figma Make is Figma's prompt-to-app tool. It is why designers can now deliver working prototypes." },
      { q: "A client asks for a \"design engineer\". What are they looking for?",
        o: ["Someone who both designs and ships front-end code", "A print production specialist", "An engineer who manages designers", "A Figma administrator"],
        why: "The design engineer sits on the blurred line between design and front-end, often using AI coding tools." },
      { q: "Why do design systems matter more in an AI workflow?",
        o: ["AI only produces on-brand, consistent output when it has components and tokens to use", "They make Figma files smaller", "They replace user research", "They are required by law"],
        why: "Without a system to pull from, AI generates generic UI. The system is the guardrail." },
      { q: "A candidate's portfolio is full of polished screens but no problem, process or result. Best next step?",
        o: ["Ask them to walk through one project: the problem, their decisions, and where AI was used", "Submit immediately, the visuals are strong", "Reject them for using AI", "Ask them to add more screens"],
        why: "Polish is cheap now. Process, decisions and outcomes show real skill." },
      { q: "Figma announced code layers and motion at Config 2026. How should you talk about them with a client?",
        o: ["As announced features, some still in beta, and ask what their team actually has access to", "As standard features every team uses", "As Adobe products", "Avoid mentioning Figma at all"],
        why: "New AI features roll out in stages. Stay accurate: say announced or in beta, and ask." }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "creative", sym: "Cr", name: "Creative and Brand Design", hue: 20,
    tag: "Adobe Firefly, Photoshop and Illustrator AI, generative video, and \"commercially safe\".",
    cards: [
      { t: "Adobe put AI in every app", p: [
        "<b>Firefly</b> is Adobe's family of generative models for images, video, audio and vectors. It powers features inside the apps designers already use:"], l: [
        "<b>Photoshop</b>: Generative Fill and Expand, plus newer tools for relighting, restyling and blending objects into a scene.",
        "<b>Illustrator</b>: Text to Vector and generative fills for shapes and patterns.",
        "<b>Premiere</b>: Generative Extend adds frames to a clip. AI handles captions, audio cleanup and search.",
        "<b>Express</b>: quick, template-driven content for marketers who are not designers."] },
      { t: "Why \"commercially safe\" comes up", p: [
        "Adobe trains Firefly on licensed and public-domain content and positions it as safe for commercial use. Many legal teams therefore allow Firefly and restrict tools like Midjourney for client-facing work.",
        "<b>Content Credentials</b> are a tamper-evident label showing how an asset was made, including whether AI was used. Expect brand and legal teams to ask about them."] },
      { t: "Agents and scale", p: [
        "At MAX in November 2026 Adobe pushed further into agents: a conversational <b>Creative Agent</b> that carries out multi-step edits inside the apps, and a Firefly assistant that works across them. Most of this is in beta or preview.",
        "For enterprises, <b>GenStudio</b> and <b>Firefly Custom Models</b> (trained on a brand's own style) generate hundreds of on-brand variations for campaigns. This is where a lot of production hiring is moving."] },
      { t: "Beyond Adobe", l: [
        "<b>Midjourney</b>: high-quality image generation, loved for concepting and mood boards.",
        "<b>Runway</b> and <b>Google Veo</b>: generative video for concepts, social and b-roll.",
        "<b>Canva Magic Studio</b>: AI design for non-designers. It is why simple requests no longer reach the design team.",
        "<b>ElevenLabs</b>: AI voice for narration and localization."] },
      { t: "What changed in the work", p: [
        "Retouching, resizing, versioning and comping went from hours to minutes. The volume of assets clients expect went up at the same time.",
        "The designer's value moved to <b>concept, art direction, taste, compositing and brand governance</b>. The best describe themselves as directing AI, then finishing by hand."] }
    ],
    tools: [
      ["Adobe Firefly", "Adobe", "Generative models for image, video, audio and vector. Positioned as commercially safe."],
      ["Generative Fill", "Adobe Photoshop", "Add, remove or extend parts of an image with a text prompt. The most-used AI feature in design."],
      ["Text to Vector", "Adobe Illustrator", "Generates editable vector art, icons and patterns from a prompt."],
      ["Adobe GenStudio", "Adobe", "Enterprise content production: on-brand campaign variations at scale with brand checks."],
      ["Content Credentials", "Adobe / C2PA", "A provenance label attached to an asset showing how it was made and whether AI was used."],
      ["Midjourney", "Midjourney", "Image generator known for striking visual quality. Often restricted for commercial work."],
      ["Runway", "Runway", "Generative video and AI video editing tools used by creative and social teams."],
      ["Canva Magic Studio", "Canva", "AI design tools for non-designers: generate, resize and rewrite in a browser."]
    ],
    roles: ["Art Director (AI-fluent)", "AI / Generative Designer", "Production Designer (AI-enabled)", "Creative Technologist", "Creative Operations Manager", "Motion Designer"],
    skills: ["Art-directing AI output", "Compositing and finishing by hand", "Building templates and brand-trained models", "Usage rights and disclosure"],
    client: [
      "What is your policy on generative imagery in customer-facing work? Commercially safe tools only?",
      "Is the need high-volume production and versioning, or concept-level craft?",
      "Which tools are licensed: Creative Cloud enterprise, Firefly, Midjourney, Runway?",
      "Do you have brand templates or custom models set up, or do you need someone to build them?",
      "Who signs off on AI-generated assets for brand and legal?"],
    cand: [
      "Show me a piece where you used generative tools. What did AI do, and what did you do?",
      "Which tools do you use for concepting versus final production?",
      "How do you handle usage rights and client restrictions on AI imagery?",
      "Have you built templates or workflows that sped up a team's production?"],
    green: ["Clear about what was AI and what was craft", "Knows which tools clients allow", "Finishes and composites by hand"],
    red: ["Passes off raw AI output as finished work", "Unaware of rights issues", "Only Midjourney experience for an enterprise client that only allows Firefly"],
    quiz: [
      { q: "Why do many legal teams allow Firefly but restrict other image generators?",
        o: ["Adobe trains it on licensed content and positions it as commercially safe", "It is free", "It only makes black-and-white images", "It works without the internet"],
        why: "Training data and commercial-use terms are the heart of the IP concern." },
      { q: "A retail client needs 200 sized and localized versions of every campaign. Which profile fits best?",
        o: ["An AI-enabled production designer who builds templates and generative workflows", "A senior conceptual art director", "A brand strategist", "A UX researcher"],
        why: "This is a production-at-scale problem. Workflow builders multiply a team's output." },
      { q: "What are Content Credentials?",
        o: ["A label attached to an asset showing how it was made, including AI use", "A designer's login", "Adobe's pricing tiers", "A stock photo licence"],
        why: "They address provenance and disclosure, which brand and legal teams increasingly ask about." },
      { q: "Where did the designer's value move as production got faster?",
        o: ["Concept, art direction, taste and brand governance", "Typing speed", "Knowing keyboard shortcuts", "Working longer hours"],
        why: "When anyone can generate options, choosing and refining the right one is the skill." },
      { q: "A candidate has a stunning Midjourney portfolio. The client only allows Firefly. What do you do?",
        o: ["Ask about their Firefly and Photoshop experience and tell them about the restriction", "Submit them without mentioning it", "Tell the client to change their policy", "Reject them outright"],
        why: "Tool policy is a real requirement. Screen for it and be transparent on both sides." }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "automation", sym: "Ma", name: "Marketing Automation", hue: 160,
    tag: "AI agents inside HubSpot, Salesforce, Adobe, Klaviyo and Braze, and why data comes first.",
    cards: [
      { t: "Every platform shipped agents", p: ["The major platforms now include AI that builds segments, writes variations, scores leads, picks send times and answers customers:"], l: [
        "<b>HubSpot</b>: Breeze, its AI layer. Assistant, agents for content, prospecting and customer service, and a management console for them.",
        "<b>Salesforce</b>: Agentforce. Marketing Cloud is now sold as Agentforce Marketing, running on Data Cloud.",
        "<b>Adobe</b>: AI assistants and agents across Marketo Engage and Journey Optimizer.",
        "<b>Klaviyo</b> and <b>Braze</b>: AI agents for ecommerce and lifecycle messaging."] },
      { t: "Data is the bottleneck", p: [
        "An agent working from a messy CRM makes mistakes faster. Duplicates, missing lifecycle stages and inconsistent fields are the most common reason AI features sit unused.",
        "That is why the first hire for an \"AI project\" is often a <b>marketing operations or data person</b>, not an AI specialist."] },
      { t: "From building to supervising", p: [
        "The specialist used to build every email, list and workflow by hand. Now the job leans toward <b>configuring agents, writing their instructions, setting approval steps, testing and measuring</b>.",
        "Clients worry about agents sending the wrong thing to the wrong people, so <b>guardrails and human approval</b> on anything outbound are a standard requirement."] },
      { t: "The glue tools and paid media", l: [
        "<b>Zapier</b>, <b>Make</b> and <b>n8n</b> connect apps and now include AI steps and agents. Often the fastest way a team automates.",
        "<b>Clay</b> enriches account data and writes personalized outreach. It gave rise to the title \"GTM engineer\".",
        "<b>Google Performance Max</b> and <b>Meta Advantage+</b> automate ad targeting, bidding and creative mixes. Paid media talent now manages inputs and measurement more than manual bids."] }
    ],
    tools: [
      ["HubSpot Breeze", "HubSpot", "HubSpot's AI layer: assistant plus agents for content, prospecting and service."],
      ["Agentforce Marketing", "Salesforce", "The AI-agent era name for Marketing Cloud, built on Salesforce's Data Cloud."],
      ["Adobe Journey Optimizer", "Adobe", "Enterprise journey orchestration with AI assistants and agents. Sits alongside Marketo Engage."],
      ["Marketo Engage", "Adobe", "B2B marketing automation, common in mid-market and enterprise demand generation."],
      ["Klaviyo", "Klaviyo", "Email and SMS for ecommerce, with AI for segments, flows and content."],
      ["Braze", "Braze", "Cross-channel customer engagement with BrazeAI agents and decisioning."],
      ["Zapier", "Zapier", "No-code automation between apps, with AI steps and agents."],
      ["Clay", "Clay", "Data enrichment and AI-personalized outbound. The home of the GTM engineer."],
      ["Performance Max", "Google Ads", "Google's AI-driven campaign type that automates targeting, bidding and creative combinations."]
    ],
    roles: ["Marketing Operations Manager", "Marketing Automation Specialist", "Lifecycle / CRM Marketing Manager", "GTM Engineer", "Marketing Technologist", "CRM Data Manager"],
    skills: ["Configuring and testing AI agents", "Data hygiene and segmentation", "Guardrails and approval flows", "Measuring lift from AI features"],
    client: [
      "Which platform are you on, and which AI features are switched on, or paid for but unused?",
      "How clean is your CRM data, and who owns it?",
      "Do you need someone to run campaigns, or to design the agents and workflows?",
      "What approvals does AI-generated outbound need before it sends?",
      "How will you measure whether the AI is working?"],
    cand: [
      "Tell me about an AI feature you rolled out. What data prep did it need?",
      "What guardrails or approval steps did you put around it?",
      "How did you measure the result?",
      "Describe an automation you built that connected several tools."],
    green: ["Starts with data quality", "Describes testing and approvals", "Shows measured results"],
    red: ["Only lists platform certifications", "No rollout story", "\"The AI just handles it\""],
    quiz: [
      { q: "A client bought AI add-ons a year ago and barely uses them. What is the most common root cause?",
        o: ["Messy data and nobody owning the rollout", "The AI is not powerful enough", "Their emails are too short", "They have too many designers"],
        why: "Unused licences are usually a data and ownership problem, and often a staffing opportunity." },
      { q: "What is Agentforce Marketing?",
        o: ["Salesforce's AI-agent era name for Marketing Cloud", "A HubSpot plug-in", "An Adobe image model", "A recruiting agency"],
        why: "Salesforce rebranded around Agentforce. HubSpot's equivalent AI layer is Breeze." },
      { q: "A CEO wants agents running campaigns by next quarter, but the CRM is full of duplicates. Who do you recommend first?",
        o: ["A marketing ops person with data hygiene and AI rollout experience", "A prompt engineer", "A social media manager", "Nobody, wait for better tools"],
        why: "Agents on bad data make mistakes faster. Fix the foundation and pilot one use case." },
      { q: "How has the marketing automation specialist's day changed?",
        o: ["More configuring, supervising and testing agents; less building everything by hand", "It has not changed", "They now mostly design logos", "They only write code"],
        why: "The work moved from manual building to supervising AI with guardrails and measurement." },
      { q: "What is a \"GTM engineer\"?",
        o: ["Someone who builds automated, AI-driven go-to-market workflows, often in tools like Clay", "A civil engineer", "A graphic designer who works in sales", "A database administrator for finance"],
        why: "It is a newer hybrid title combining ops, data and automation for sales and marketing." }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "frontend", sym: "Fe", name: "Front-End Development", hue: 215,
    tag: "Claude Code, Codex, Cursor, and the difference between using AI and building it.",
    cards: [
      { t: "Coding agents are the norm", p: ["Developers now work alongside agents that read a codebase, write and edit files, run tests and open pull requests:"], l: [
        "<b>Claude Code</b> (Anthropic): an agentic coding tool that started in the terminal and now also runs in editors, on the web and in the cloud.",
        "<b>Codex</b> (OpenAI): a coding agent available as a command-line tool, an editor extension and cloud tasks.",
        "<b>Cursor</b>: an AI-first code editor. Visual, with inline edits you accept or reject, which suits UI work.",
        "<b>GitHub Copilot</b>: the original in-editor assistant, now with its own coding agent."],
        note: "These tools have converged. All offer editor, terminal and cloud options, and all connect to other tools through MCP. Developers often use more than one." },
      { t: "Vibe coding versus engineering", p: [
        "<b>Vibe coding</b> means describing what you want and accepting what the AI builds without reading it closely. Fine for a prototype. Risky for production.",
        "Professional teams want <b>engineers who direct agents and verify the result</b>: tests, code review, accessibility, performance and security. The output is faster, but a human still owns it."] },
      { t: "The setup is a skill", p: [
        "Strong developers give the agent context: <b>rules files</b> (such as CLAUDE.md or AGENTS.md) that describe the codebase and standards, MCP connections to Figma and other tools, and a test suite the agent can run.",
        "Ask about it. A developer who has tuned their setup gets far better results than one who just types prompts."] },
      { t: "\"Uses AI\" is not \"builds AI\"", p: [
        "Two very different requests sound alike:"], l: [
        "<b>AI-assisted developer</b>: a front-end engineer who ships faster with coding agents.",
        "<b>AI engineer</b>: someone who builds AI features into a product. Model APIs, retrieval (RAG), evaluation, chat interfaces."],
        note: "Always ask the client which one they mean. The talent pools and rates differ." },
      { t: "Prompt-to-app tools", p: [
        "<b>v0</b>, <b>Lovable</b> and <b>Bolt</b> build working apps from a description. Marketers and designers use them for landing pages, prototypes and internal tools.",
        "They widen who can build, which shifts front-end demand toward complex, production-grade work and toward people who can take a generated prototype and make it real."] }
    ],
    tools: [
      ["Claude Code", "Anthropic", "Agentic coding tool for terminal, editor, web and cloud. Reads the codebase and makes changes."],
      ["Codex", "OpenAI", "OpenAI's coding agent: command line, editor extension and cloud tasks."],
      ["Cursor", "Anysphere", "AI-first code editor with inline edits and agents. Popular for front-end and UI work."],
      ["GitHub Copilot", "GitHub / Microsoft", "In-editor code assistant and coding agent, common in enterprises on GitHub."],
      ["Bolt", "StackBlitz", "Prompt-to-app builder that runs in the browser."],
      ["Rules files", "CLAUDE.md, AGENTS.md", "Plain-text instructions that tell a coding agent how a codebase works and what standards to follow."]
    ],
    roles: ["Front-End Engineer (AI-native)", "Design Engineer", "UX Engineer", "Full-Stack Product Engineer", "AI Engineer (builds AI features)"],
    skills: ["Directing agents with clear specs", "Reviewing AI-written code", "Testing, accessibility, security", "Context setup: rules files and MCP"],
    client: [
      "Which AI coding tools are approved here? Security often limits the list.",
      "Do you need someone who uses AI to ship faster, or someone who builds AI features into the product?",
      "How does your team review AI-written code: tests, pull requests, accessibility checks?",
      "Does your interview allow AI tools? What are you testing for?",
      "How has AI changed your expectations for speed and team size?"],
    cand: [
      "Which coding tools do you use daily, and how have you set them up for your codebase?",
      "Tell me about a time the agent was confidently wrong. How did you catch it?",
      "What do you never hand to AI?",
      "How do you test and review before you merge?"],
    green: ["Talks about tests and review", "Has tuned rules files or MCP", "Can explain the code"],
    red: ["\"I don't read the code\"", "Speed claims with no quality story", "Cannot work without the tool, or refuses to use it"],
    quiz: [
      { q: "A client says: \"We need an AI developer.\" What is your first clarifying question?",
        o: ["Do you need someone who uses AI to code faster, or someone who builds AI features into your product?", "Which office are they in?", "Do they prefer Mac or PC?", "How many monitors do they need?"],
        why: "AI-assisted developer and AI engineer are different roles with different pools and rates." },
      { q: "What best describes \"vibe coding\"?",
        o: ["Accepting AI-built code without closely reading it", "Writing code to music", "Pair programming with a colleague", "A formal code review method"],
        why: "It is fine for prototypes. For production, clients want engineers who verify the work." },
      { q: "Which is described as an AI-first code editor with inline edits you accept or reject?",
        o: ["Cursor", "Figma Make", "Profound", "Marketo Engage"],
        why: "Cursor is a visual editor. Claude Code and Codex began as terminal agents, though all three have converged." },
      { q: "A candidate says they ship five times faster and never read the code. What do you probe?",
        o: ["How they catch errors: tests, review, accessibility and security checks", "Their typing speed", "Whether they can go faster", "Nothing, submit them as senior"],
        why: "Speed without verification is a risk. The strong story is directing the agent and checking the result." },
      { q: "What is a rules file such as CLAUDE.md or AGENTS.md?",
        o: ["Instructions that tell a coding agent how the codebase works and what standards to follow", "A legal contract", "A design mock-up", "A list of banned websites"],
        why: "Context setup is a real skill. It is a good screening question." }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "aeo", sym: "Ae", name: "AEO and AI Search", hue: 130,
    tag: "Answer engine optimization: getting brands cited by ChatGPT, Gemini and AI Overviews.",
    cards: [
      { t: "Search became answers", p: [
        "People now ask ChatGPT, Gemini, Perplexity and Google's <b>AI Overviews</b> and <b>AI Mode</b> a question and get a written answer with a few cited sources. Many never click a link.",
        "<b>AEO</b> (answer engine optimization) is the work of getting a brand mentioned and cited in those answers. You will also hear <b>GEO</b> (generative engine optimization), AI search and LLM visibility. They mean roughly the same thing."] },
      { t: "The scoreboard changed", p: [
        "Classic SEO measured rankings and traffic. With zero-click answers, traffic can fall while the brand is still being seen.",
        "New measures: <b>how often the brand is cited or mentioned</b>, its <b>share of voice</b> against competitors across a set of prompts, sentiment, and the quality of the visitors who do click through."] },
      { t: "What earns a citation", l: [
        "Clear, answer-first content with real expertise and original data.",
        "Structure: headings, FAQs and schema markup that machines can parse.",
        "Authority beyond the website: reviews, Reddit and community threads, press, YouTube. AI models draw on all of it.",
        "Fresh, accurate, crawlable pages. Solid technical SEO is still the foundation."],
        note: "This is why AEO pulls together SEO, content and digital PR. Ask clients who owns it." },
      { t: "The tools, and a caution", p: [
        "A wave of trackers measures AI visibility: <b>Profound</b>, <b>Peec AI</b>, <b>Semrush's AI Visibility Toolkit</b>, <b>Ahrefs Brand Radar</b>. They run prompts across the AI engines and report who gets cited.",
        "The discipline is young and results are noisy. AI answers vary by person and by day. Be wary of anyone who <b>guarantees</b> a placement in ChatGPT."] }
    ],
    tools: [
      ["Profound", "Profound", "AI visibility platform tracking brand citations across ChatGPT, Perplexity, Gemini and Google's AI results."],
      ["Peec AI", "Peec AI", "AI search analytics for marketing teams: mentions, sources and competitors across engines."],
      ["AI Visibility Toolkit", "Semrush", "Semrush's add-on for monitoring brand presence in AI answers."],
      ["Brand Radar", "Ahrefs", "Ahrefs' tracker for brand mentions in AI answers."],
      ["AI Overviews", "Google", "AI-written summaries at the top of Google results, with cited links."],
      ["AI Mode", "Google", "Google's conversational search experience for longer, follow-up questions."]
    ],
    roles: ["AEO / GEO Strategist", "AI Search Specialist", "SEO Manager (AI search)", "Content Strategist", "Digital PR Manager", "Technical SEO"],
    skills: ["Prompt and citation tracking", "Answer-first content structure", "Schema and technical SEO", "Digital PR and community presence"],
    client: [
      "Have you checked how your brand shows up in ChatGPT or AI Overviews for your top buying questions?",
      "Has organic traffic dipped while impressions held steady? How are you reporting on that?",
      "Who owns AI search today: SEO, content or PR?",
      "Do you need strategy, or hands-on execution like content refreshes and schema?",
      "Are you using an AI visibility tool yet?"],
    cand: [
      "How do you measure AI visibility, and with which tools?",
      "Give me an example of a change you made that improved citations.",
      "What is different about AEO compared with traditional SEO, and what is the same?",
      "How do you explain noisy AI search data to a stakeholder?"],
    green: ["Runs experiments and shares results", "Honest about uncertainty", "Connects SEO, content and PR"],
    red: ["Guarantees rankings in ChatGPT", "Says SEO is dead", "No measurement approach"],
    quiz: [
      { q: "What is the goal of AEO?",
        o: ["Getting a brand cited and mentioned in AI-generated answers", "Buying more search ads", "Removing a website from Google", "Writing longer blog posts"],
        why: "AEO, also called GEO, is about visibility inside AI answers, not only blue links." },
      { q: "A client says traffic is down but leads are steady. Which concept explains part of this?",
        o: ["Zero-click answers: people get what they need from the AI summary", "Their logo is outdated", "Email deliverability", "Too many job postings"],
        why: "AI answers satisfy many searches without a click, so traffic alone is a weaker measure." },
      { q: "Which is a newer AEO measure?",
        o: ["Share of voice in AI answers across a set of prompts", "Number of fonts on the site", "Fax response rate", "Page count"],
        why: "Citations, mentions and share of voice join rankings and traffic on the scoreboard." },
      { q: "A candidate promises to make the client number one in ChatGPT, guaranteed. How do you read that?",
        o: ["A red flag. AI answers vary and nobody can guarantee placement", "A strong signal of confidence", "Standard industry practice", "Proof they work at OpenAI"],
        why: "Good AEO people talk about experiments and probabilities, not guarantees." },
      { q: "Why does AEO often involve digital PR and community sites as well as the website?",
        o: ["AI models draw on reviews, forums, press and video, not just a brand's own pages", "Because websites are obsolete", "PR teams have bigger budgets", "Google requires it"],
        why: "Authority across the web influences what AI engines say about a brand." }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "copy", sym: "Cw", name: "Copywriting and Content", hue: 45,
    tag: "When first drafts are free, what clients pay writers for.",
    cards: [
      { t: "The first draft is a commodity", p: [
        "ChatGPT, Claude and Gemini produce a passable draft of almost anything in seconds. Marketing platforms write their own subject lines and ad variations.",
        "So clients have stopped paying for words on a page. They pay for <b>strategy, a distinctive voice, original ideas, accuracy and editing</b>."] },
      { t: "The writer as editor-in-chief", p: [
        "A modern writer's workflow often looks like this: research and brief, draft with AI, then rewrite heavily. They add reporting, interviews with subject experts, real examples and a point of view the AI does not have.",
        "They also <b>fact-check everything</b>. AI invents statistics, quotes and sources."] },
      { t: "Brand voice became a system", p: [
        "Teams now capture their voice in a guide that AI can use, then load it into a <b>custom GPT, Claude Project or Gemini Gem</b>, or an enterprise platform like <b>Writer</b> or <b>Jasper</b> with brand rules and approvals.",
        "Someone has to build and maintain that system. This is a real, billable skill, and a common contract project."] },
      { t: "Where demand moved", l: [
        "<b>Down</b>: high-volume, low-stakes copy such as basic product descriptions and generic blog posts.",
        "<b>Up</b>: content strategy, thought leadership, concept-led campaign writing, UX writing, regulated industries, and editors who can run an AI content workflow.",
        "Writers with deep subject knowledge (health, finance, technical B2B) are harder to replace and easier to place."],
        note: "AI-detection tools are unreliable. Do not promise a client that content will \"pass a detector\". Talk about quality, accuracy and disclosure policy." }
    ],
    tools: [
      ["Jasper", "Jasper", "Marketing content platform with brand voice, campaigns and team workflows."],
      ["Writer", "Writer", "Enterprise AI writing platform with style rules, governance and approvals."],
      ["Grammarly", "Grammarly", "Writing assistant for tone, clarity and rewriting, used company-wide."],
      ["Custom GPTs", "OpenAI", "A packaged ChatGPT with instructions and files, often a brand voice guide."],
      ["Claude Projects", "Anthropic", "A workspace in Claude that holds brand guides and reference material for consistent drafts."]
    ],
    roles: ["Content Strategist", "Senior / Conceptual Copywriter", "AI Content Editor", "UX Writer / Content Designer", "Content Operations Lead", "Subject-Matter Writer"],
    skills: ["Editing and elevating AI drafts", "Fact-checking and sourcing", "Building brand voice guides for AI", "Original reporting and interviews"],
    client: [
      "What does \"writer\" mean for this role now: net-new concepts, or editing and elevating AI drafts?",
      "Do you have a documented brand voice that an AI tool can use? Who maintains it?",
      "What is your policy on AI-written content, disclosure and fact-checking?",
      "How is content performing since you started using AI?",
      "What volume and which channels?"],
    cand: [
      "Take me through your process from brief to final. Where does AI come in?",
      "Can you show an AI draft next to your finished version?",
      "How do you fact-check AI-assisted work?",
      "Have you built a voice guide or prompt library a team used?"],
    green: ["Shows before and after", "Has a fact-checking habit", "Brings subject expertise or original reporting"],
    red: ["Publishes raw AI output", "Cannot describe their own voice", "Promises to beat AI detectors"],
    quiz: [
      { q: "What are clients paying writers for now that drafts are cheap?",
        o: ["Strategy, voice, original ideas, accuracy and editing", "Words per minute", "Longer articles", "Fancy vocabulary"],
        why: "The draft is a commodity. Judgment and originality are the product." },
      { q: "A VP says: \"ChatGPT writes our blogs, so we cut the copywriter.\" Best response?",
        o: ["Ask who briefs, edits and fact-checks it, and how the content is performing", "Tell them AI content is always bad", "Agree and move on", "Offer a discount"],
        why: "Curiosity uncovers the real gap, which is usually editorial ownership." },
      { q: "What is a custom GPT or Claude Project typically used for in a content team?",
        o: ["Holding the brand voice guide and references so drafts come out consistent", "Processing payroll", "Hosting the website", "Recording podcasts"],
        why: "Brand voice is now a system someone has to build and maintain." },
      { q: "A client asks you to guarantee the content will pass an AI detector. What do you say?",
        o: ["Detectors are unreliable; let's agree on quality, accuracy and your disclosure policy", "Yes, guaranteed", "Our writers never use AI", "Detectors are illegal"],
        why: "Stay truthful. Detection tools produce false results in both directions." },
      { q: "Which writer is easiest to place in the current market?",
        o: ["One with deep subject expertise who can also run an AI workflow", "One who writes generic blog posts quickly", "One who refuses to edit", "One who has never used a style guide"],
        why: "Subject depth plus AI fluency is the combination clients ask for." }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "learning", sym: "Ld", name: "Learning and Instructional Design", hue: 320,
    tag: "AI-built courses, avatar video, and L&D's new job of upskilling everyone on AI.",
    cards: [
      { t: "Course building got fast", p: [
        "<b>Articulate 360's AI Assistant</b> drafts course outlines, lessons, quizzes, images and narration inside Rise and Storyline, the tools most instructional designers already use.",
        "What took weeks of storyboarding and building can take days. Surveys this year suggest the large majority of L&D teams already use AI somewhere in their work."] },
      { t: "Video and localization got cheap", p: [
        "<b>Synthesia</b> and <b>HeyGen</b> create presenter-style videos with AI avatars from a script. <b>ElevenLabs</b> generates natural narration and translates it into other languages.",
        "Training that used to need a studio and a translation vendor can be produced and updated by one person. Accuracy review by native speakers and subject experts still matters."] },
      { t: "From course builder to performance consultant", p: [
        "When content is cheap to make, the valuable questions are: <b>does this training change behavior, and is it the right fix at all?</b>",
        "Strong instructional designers now spend more time on needs analysis, practice design, measurement and working with subject experts. AI role-play simulators and tutors let learners practice conversations and get feedback."] },
      { t: "L&D owns AI upskilling", p: [
        "Companies are asking their learning teams to make the whole workforce AI-literate. That created a second kind of demand:"], l: [
        "People who build training <b>with</b> AI.",
        "People who build training <b>about</b> AI: literacy programs, tool rollouts, prompt workshops, policy training."],
        note: "Ask every L&D client which one they need. Often it is both, and they have not said so in the job description." }
    ],
    tools: [
      ["Articulate AI Assistant", "Articulate 360", "AI inside Rise and Storyline that drafts courses, quizzes, images and audio."],
      ["Synthesia", "Synthesia", "AI avatar video from a script. Widely used for training and onboarding."],
      ["HeyGen", "HeyGen", "AI avatar and video translation tool."],
      ["ElevenLabs", "ElevenLabs", "AI voice generation and dubbing for narration and localization."],
      ["NotebookLM", "Google", "Research assistant grounded in your own documents. Turns source material into summaries and audio overviews."],
      ["Docebo", "Docebo", "A learning platform with AI for content, skills mapping and personalized paths."]
    ],
    roles: ["Instructional Designer (AI-enabled)", "Learning Experience Designer", "eLearning Developer", "Learning Technologist", "AI Enablement / AI Literacy Program Manager"],
    skills: ["AI-assisted authoring", "Avatar video and localization", "Needs analysis and measurement", "Designing AI literacy programs"],
    client: [
      "Is this role building training with AI, building training about AI, or both?",
      "Which authoring tools and learning platform do you use? Are the AI features enabled?",
      "How do subject experts review AI-generated content for accuracy?",
      "Do you need video or multiple languages?",
      "How do you measure whether training worked?"],
    cand: [
      "Show me a course where you used AI. What did it speed up, and what did you redo?",
      "How do you check AI-generated content with subject experts?",
      "Have you produced avatar video or localized training?",
      "Have you designed AI literacy or tool-adoption training?"],
    green: ["Starts from the performance problem", "Has an accuracy review process", "Can show measured outcomes"],
    red: ["Equates more content with better learning", "No expert review of AI content", "Only knows one tool"],
    quiz: [
      { q: "Which tool puts AI drafting inside Rise and Storyline?",
        o: ["Articulate 360's AI Assistant", "Cursor", "Profound", "Klaviyo"],
        why: "Articulate is the dominant authoring suite, so its AI Assistant is the one to know." },
      { q: "What are Synthesia and HeyGen used for?",
        o: ["Creating presenter-style training videos with AI avatars", "Tracking search rankings", "Writing front-end code", "Managing CRM data"],
        why: "Avatar video made training video and localization far cheaper." },
      { q: "An L&D client says: \"We need an instructional designer with AI experience.\" What should you clarify?",
        o: ["Whether they need training built with AI, training about AI, or both", "Whether the candidate owns a webcam", "How many slides they like", "Their favorite font"],
        why: "These are two different needs and many clients have not separated them." },
      { q: "As content gets cheap to produce, where does the instructional designer's value move?",
        o: ["Needs analysis, practice design and measuring behavior change", "Making more slides", "Longer courses", "Narrating everything personally"],
        why: "The shift is from course builder to performance consultant." },
      { q: "What must still happen before AI-translated compliance training goes live?",
        o: ["Review by native speakers and subject experts", "Nothing, AI translation is flawless", "A new logo", "Printing it on paper"],
        why: "Human accuracy review remains essential, especially for compliance content." }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "clients", sym: "Cl", name: "Client Conversations", hue: 0, talk: true,
    tag: "Run an AI-aware intake, decode vague requests, and handle the common objections.",
    cards: [
      { t: "Be the consultant, not the tool list", p: [
        "You do not need to be the expert in every tool. You need to ask the questions that show you understand how the work changed, then translate the answers into a better search.",
        "A strong opener for any intake: <b>\"How has AI changed what this team does day to day?\"</b> Then listen."] },
      { t: "The STACK intake", p: ["Five things to learn on every job order:"], l: [
        "<b>S, Stack</b>: which AI tools are licensed and approved? Which are banned?",
        "<b>T, Tasks</b>: which parts of this role does AI touch today?",
        "<b>A, Ability</b>: what level on the Fluency Ladder do they need: practitioner, builder or leader?",
        "<b>C, Controls</b>: what are the rules on review, legal, disclosure and client data?",
        "<b>K, KPIs</b>: how will they know the hire, and the AI, is working?"] },
      { t: "Decode \"we need an AI person\"", p: ["That sentence hides three different needs:"], l: [
        "<b>User</b>: does the craft faster and better with AI. The most common need.",
        "<b>Builder</b>: creates workflows, templates, agents and automations for the team. Often a great contract project.",
        "<b>Leader</b>: owns strategy, policy, vendor choices and change management."],
        note: "Each has a different talent pool and rate. Pin it down before you search." },
      { t: "Listen for openings", l: [
        "\"We bought it but nobody uses it.\" A rollout or enablement project.",
        "\"Our data is a mess.\" Marketing ops or data cleanup before any AI work.",
        "\"Leadership wants more AI.\" A pilot led by a contract specialist with a clear measure.",
        "\"The team is nervous.\" Training and an AI-fluent lead who can coach.",
        "\"We have a huge backlog.\" AI-enabled production talent."] },
      { t: "Stay credible", l: [
        "Say \"as of the last I saw\" about features. Tools change monthly.",
        "Do not promise that AI skills make talent cheaper. Specialized skills earn a premium.",
        "Do not oversell a candidate's AI depth. Share the example they gave you.",
        "If you do not know, say so and follow up. That builds more trust than bluffing."] }
    ],
    tools: [],
    roles: [], skills: [],
    client: [
      "How has AI changed what this team does day to day?",
      "Which AI tools are approved, and which are off limits?",
      "Which tasks in this role does AI already handle?",
      "Do you need a user, a builder or a leader?",
      "What does good look like 90 days in?",
      "Does your interview process allow or test AI use?"],
    cand: [],
    green: ["Client can name tools and tasks", "Clear policy and review process", "Realistic must-haves"],
    red: ["\"AI so we can pay half\"", "A unicorn list of every tool", "No one owns AI decisions"],
    quiz: [
      { q: "What does the S in the STACK intake stand for?",
        o: ["Stack: which AI tools are licensed, approved or banned", "Salary", "Start date", "Seniority"],
        why: "STACK is Stack, Tasks, Ability, Controls, KPIs." },
      { q: "A client says: \"We need an AI person.\" What do you pin down first?",
        o: ["Whether they need a user, a builder or a leader", "Which AI stock to buy", "Whether they like robots", "The office dress code"],
        why: "Those are three different searches with different pools and rates." },
      { q: "\"Now that designers use AI, we should pay less.\" What is the best reply?",
        o: ["AI-fluent specialists multiply a team's output, so the market pays a premium for them. Let's look at what the role must deliver", "You are right, I'll find someone cheaper", "AI doesn't really work", "That is illegal"],
        why: "Reframe around output and value, with market reality." },
      { q: "A client says they bought AI features and nobody uses them. What is that?",
        o: ["An opening for a rollout or enablement project", "A reason to end the call", "Proof AI is a fad", "A billing complaint for the vendor only"],
        why: "Unused licences signal a need for someone to own adoption." },
      { q: "A client asks about a feature you are unsure of. What do you do?",
        o: ["Say you are not certain, and follow up after checking", "Make up an answer confidently", "Change the subject", "Tell them the feature was cancelled"],
        why: "Tools change monthly. Honesty and follow-through build credibility." }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: "candidates", sym: "Ca", name: "Candidate Conversations", hue: 185, talk: true,
    tag: "Screen for real AI skill, coach the nervous, and present people accurately.",
    cards: [
      { t: "Every screen includes AI now", p: [
        "Whatever the discipline, ask how the candidate uses AI. You are not testing whether they are a fan. You are finding out <b>where they sit on the Fluency Ladder</b> and whether they can prove it."] },
      { t: "Show, Tell, Trade-off", p: ["Three prompts that separate real skill from buzzwords:"], l: [
        "<b>Show</b>: \"Can you show me something you made with it?\" A file, a prototype, a before and after.",
        "<b>Tell</b>: \"Walk me through the steps.\" Listen for named tools and a clear workflow.",
        "<b>Trade-off</b>: \"Where did it fail, and where do you not use it?\" People with real experience always have an answer."] },
      { t: "Coach the résumé and portfolio", l: [
        "Replace \"AI enthusiast\" with tools plus outcomes: \"Built a Firefly template workflow that cut versioning time by 60%.\"",
        "List tools under the discipline they belong to, not in one long AI section.",
        "In portfolios, label where AI was used and show the process. Honesty reads as confidence.",
        "Prepare one story for interviews: the task, the tool, the check, the result."] },
      { t: "Coach the skeptic and the anxious", p: [
        "Some excellent candidates avoid AI on principle or out of worry. Do not dismiss the concern. Concerns about training data and job security are reasonable, and many clients share them.",
        "Tell them what hiring managers are asking for, point them to tools that fit their values (for example, commercially safe ones), and suggest one small real project to try. Their judgment and taste are what clients pay for."] },
      { t: "Keep it honest", l: [
        "Never coach a candidate to claim experience they do not have.",
        "Present their level accurately. A solid Level 2 is very placeable.",
        "Ask how they handle confidential client data in AI tools. It is a deal-breaker for many clients.",
        "Tell candidates which tools the client permits before the interview."] }
    ],
    tools: [],
    roles: [], skills: [],
    client: [],
    cand: [
      "Which AI tools do you use in a normal week, and for what?",
      "Can you show me something you made with them?",
      "Walk me through the steps, start to finish.",
      "Where did AI fail you, and where do you not use it?",
      "Have you built anything your team reuses?",
      "How do you handle confidential or client data in AI tools?"],
    green: ["Specific tools, steps and results", "Names limits and failures", "Careful with client data"],
    red: ["Buzzwords only", "Hides AI use", "Claims the tool never fails"],
    quiz: [
      { q: "What are the three prompts in the screening method?",
        o: ["Show, Tell, Trade-off", "Ask, Wait, Repeat", "Tools, Titles, Tenure", "Pitch, Price, Close"],
        why: "Show me something, tell me the steps, and where does it fail." },
      { q: "A résumé says \"AI enthusiast, prompt guru\". How do you coach it?",
        o: ["Replace it with specific tools and a measured outcome", "Make the font bigger", "Add more adjectives", "Leave it, buzzwords get interviews"],
        why: "Tools plus outcomes beat labels." },
      { q: "A talented designer refuses to use AI because of training-data concerns. Best approach?",
        o: ["Acknowledge the concern, share what clients ask for, and suggest commercially safe tools and a small trial project", "Tell them their career is over", "Submit them and claim they use AI daily", "Stop working with them"],
        why: "Respect the concern, give market reality, and offer a practical next step." },
      { q: "Why ask how a candidate handles client data in AI tools?",
        o: ["Pasting confidential data into unapproved tools is a deal-breaker for many clients", "To find out their favorite app", "It is required for payroll", "It tests typing accuracy"],
        why: "Data handling is a core part of AI fluency and client risk." },
      { q: "A candidate is a solid daily user but has never built team workflows. How do you present them?",
        o: ["Accurately, as a hands-on practitioner, with their best concrete example", "As an AI strategist", "As an AI engineer", "As a beginner"],
        why: "Accurate positioning protects your credibility and gets better matches." }
    ]
  }
];

/* ---------- Call Simulator: branching role-plays ----------
   Each turn: say (what they say), opts: [best(2pts), okay(1pt), poor(0pts)] */

const SCENARIOS = [
  { id: "cmo", who: "Client", name: "Dana, VP Marketing", org: "B2B software company", title: "\"ChatGPT writes our blogs now\"",
    turns: [
      { say: "We're cancelling the copywriter req. ChatGPT writes our blogs now.",
        opts: [
          ["Makes sense to rethink it. Who briefs the AI, fact-checks it and keeps it on voice today? And how is that content performing?", "Curiosity instead of a counter-argument. You find the real gap."],
          ["A lot of teams are doing that. If volume becomes a problem, we have great writers.", "Polite, but you learned nothing and left no reason to keep talking."],
          ["AI content is low quality and Google penalizes it. You really need a human writer.", "Arguing with a blanket claim costs you credibility, and it isn't accurate."]] },
      { say: "Honestly, our product marketers edit it at night. Traffic is down and nobody is sure it sounds like us.",
        opts: [
          ["So the gap isn't drafting. It's editorial ownership: strategy, voice and accuracy. That's a content strategist who runs an AI workflow, not a volume writer. Want me to outline that profile?", "You reframed the role around the real problem and offered a next step."],
          ["Sounds like you do need a copywriter after all. I can send three résumés today.", "You jumped to the old job description and missed the changed need."],
          ["Traffic is down for everyone because of AI search. There isn't much you can do.", "Half true and unhelpful. AEO and better content are things they can act on."]] },
      { say: "Maybe. But I don't have a full-time headcount approved.",
        opts: [
          ["Then start with a contract editor for 90 days: build the voice guide and prompt library, fix your top pages, set an AI search baseline. You'll have results to justify the headcount.", "A scoped, low-risk pilot with a measurable outcome."],
          ["Understood. Reach out when the headcount is approved.", "You walked away from a contract opportunity."],
          ["Full-time is really the only way to get quality talent.", "Untrue, and it ignores the constraint she just gave you."]] }
    ] },

  { id: "unicorn", who: "Client", name: "Marcus, Creative Director", org: "Retail brand", title: "The AI unicorn hunt",
    turns: [
      { say: "I need an \"AI designer\". Midjourney, Firefly, video, motion, and they should code landing pages too. Forty dollars an hour.",
        opts: [
          ["Let's unpack that. If this person could only nail two things in their first 90 days, what would they be?", "Prioritizing turns a wish list into a searchable role."],
          ["That's a tough search at that rate, but I'll see who's out there.", "You accepted an unfillable brief and set yourself up to disappoint."],
          ["Sure, lots of designers do all of that with AI now.", "Overpromising. AI widens range, but it doesn't replace depth in each skill."]] },
      { say: "Honestly? We're drowning in versioning. Every campaign needs 200 sized, localized assets. And leadership wants \"more AI\".",
        opts: [
          ["That's production at scale: an AI-enabled production designer who builds templates and generative workflows with brand review built in. Video and code can be nice-to-haves. What's your policy on generative imagery in customer-facing work?", "You named the real profile and asked the controls question."],
          ["Got it, a production designer. I'll send some over.", "Right direction, but you skipped the AI workflow skill and the policy question."],
          ["Then you need a senior AI art director to reinvent your creative.", "You solved a problem he didn't describe."]] },
      { say: "Legal only allows Firefly because it's commercially safe. And the rate?",
        opts: [
          ["Good to know. I'll screen for Firefly and Creative Cloud specifically. On rate: people who build these workflows multiply a team's output, so the market pays more for them. Let me show you the range for a workflow builder versus hands-on production.", "You used the policy in your screen and reset the rate with a reason and options."],
          ["Forty might work for someone junior who has played with AI tools.", "You matched the budget and missed the need. That placement is likely to fail."],
          ["The rate isn't flexible? OK, we'll make it work.", "Agreeing to a rate the market won't support wastes everyone's time."]] }
    ] },

  { id: "ops", who: "Client", name: "Priya, Director of Marketing Ops", org: "HubSpot shop", title: "\"Agents by Q1\"",
    turns: [
      { say: "We bought the AI add-ons a year ago and barely use them. Now my CEO wants agents running campaigns by Q1.",
        opts: [
          ["What's been in the way: data quality, bandwidth, or nobody owning it? And what would your CEO count as a win by Q1?", "You diagnose the blocker and define success before proposing anyone."],
          ["We have HubSpot admins who can turn those features on.", "Switching features on isn't the problem. You skipped discovery."],
          ["Agents can run the whole thing now. You may just need fewer coordinators.", "Overstates the technology and threatens her team."]] },
      { say: "The data is a mess. Duplicates, no lifecycle stages. And my team is buried in campaign execution.",
        opts: [
          ["Then the first hire isn't an \"AI person\". It's marketing ops with data hygiene skills who has rolled out AI features before. Clean the foundation, pilot one agent on one use case, measure it.", "Agents on bad data make mistakes faster. You sequenced the work correctly."],
          ["You need an AI specialist to configure agents right away so you hit Q1.", "Chasing the deadline over the foundation sets the project up to fail."],
          ["I'd wait until the tools mature.", "No help with the CEO's goal, and no opportunity for you."]] },
      { say: "How would I even vet that someone has actually done this?",
        opts: [
          ["Ask for one rollout story end to end: which feature, what data prep, what approvals, what they measured, and where the AI got it wrong. I screen for exactly that and will write up their answers.", "You gave her a method and showed your own screening value."],
          ["Look for HubSpot certifications on the résumé.", "Certifications show study. They don't show a rollout."],
          ["Anyone with AI in their title for the last two years should be fine.", "Titles are the least reliable signal in this market."]] }
    ] },

  { id: "skeptic", who: "Candidate", name: "Elena, Senior Brand Designer", org: "15 years of experience", title: "The principled skeptic",
    turns: [
      { say: "Honestly, I don't touch AI. It's built on stolen work and it makes junk. My portfolio speaks for itself.",
        opts: [
          ["Your portfolio is strong, and the training-data concern is one many clients share. Can I tell you what hiring managers are asking for, so you can decide how to position yourself?", "Respect first, then permission to share market reality."],
          ["Totally fair. I'll only submit you for roles that don't mention AI.", "Kind, but it shrinks her options without telling her so."],
          ["You need to get over that or you won't get hired.", "Dismissive. You lose her trust and the relationship."]] },
      { say: "Fine. What are they asking?",
        opts: [
          ["Most don't want AI-generated final art. They ask whether you can speed up production with things like Generative Fill, comp ideas quickly, and art-direct AI output. Many only allow commercially safe tools like Firefly, which speaks to your concern.", "Accurate, specific, and connected to her values."],
          ["They want everyone using Midjourney for everything now.", "Inaccurate, and it confirms her worst assumption."],
          ["Just add AI to your skills section. Nobody checks.", "Coaching someone to misrepresent themselves. Never."]] },
      { say: "So what would you have me do before an interview?",
        opts: [
          ["Take one real project and run the production parts through Photoshop's generative tools. Then you can say truthfully: here is where it helped, and here is where I overrode it.", "A small, honest step that produces a real interview story."],
          ["Take a few online AI courses and list the certificates.", "Courses help, but hiring managers want applied work."],
          ["Say you use it daily. You'll pick it up on the job.", "Dishonest, and it will come apart in the interview."]] }
    ] },

  { id: "expert", who: "Candidate", name: "Jordan, Marketing Manager", org: "Résumé headline: AI Marketing Strategist", title: "The self-declared expert",
    turns: [
      { say: "I'm basically an AI expert. I've used every tool. Prompt engineering is my superpower.",
        opts: [
          ["Great. Walk me through one workflow you built: the tools, the steps, and what changed in the results.", "\"Show and Tell\" in one question. Specifics will reveal the real level."],
          ["Great. Which tools are you best with?", "A start, but a list of names tells you little."],
          ["Perfect, AI experts are in demand. I'll submit you today.", "You took a label at face value."]] },
      { say: "Uh, mostly I use ChatGPT for emails and social posts. It saves a ton of time.",
        opts: [
          ["That's useful. Have you made it repeatable: saved prompts, a custom GPT with your brand voice, anything teammates use? And how do you check the output before it ships?", "You probe for Builder-level work and for a review habit without deflating them."],
          ["OK, so you're more of a beginner.", "Blunt, and possibly wrong. You stopped digging too early."],
          ["Good enough. I'll call that AI strategy on your profile.", "Inflating a profile damages your credibility with the client."]] },
      { say: "I did build a custom GPT with our voice guide. The team uses it for first drafts. I review everything, because it sometimes invents stats.",
        opts: [
          ["That's concrete: a team tool, a review step and a known failure. I'd present you as a hands-on AI practitioner in content marketing, with that example and the time it saves on your résumé. Sound right?", "Accurate positioning, backed by evidence, agreed with the candidate."],
          ["Nice. Let's keep \"AI expert\" on the résumé. It gets clicks.", "The label invites questions the candidate can't answer."],
          ["If it invents stats, you probably shouldn't mention that to clients.", "Knowing the failure mode is a strength. Hiding it removes the best part of the story."]] }
    ] },

  { id: "vibe", who: "Candidate", name: "Sam, Front-End Developer", org: "3 years of experience", title: "The vibe coder",
    turns: [
      { say: "I ship five times faster now. Claude Code and Cursor write basically everything. I barely read the code.",
        opts: [
          ["Speed is a real selling point. When the agent is wrong, and it will be, how do you catch it before it ships?", "You credit the strength and go straight to the risk clients care about."],
          ["Five times! Clients will love that.", "You missed the red flag in \"I barely read the code\"."],
          ["That sounds risky. Maybe don't mention AI in interviews.", "Hiding tool use is dishonest and wastes a real advantage."]] },
      { say: "I mean, I run it, click around, and if it works, I merge.",
        opts: [
          ["Here's what clients probe: tests, code review, accessibility, security. Many now interview by having you review AI-written code. Can you tell me about a bug you caught, or a time you rewrote what it gave you?", "You explain the client's lens and look for evidence of verification."],
          ["Maybe just say you read all of it, to be safe.", "Coaching a false claim. It will fail in a technical interview."],
          ["If it works, it works. I'll submit you as senior.", "You are presenting a risk as a senior hire."]] },
      { say: "Actually, yes. It once used a library with no keyboard support. I caught it in an accessibility check, had it rebuilt with our components, and added a rules file so it stops doing that.",
        opts: [
          ["That's your story: you direct the agent, verify its work, and fix the setup so the mistake doesn't repeat. Lead with that. I'll also check which tools the client approves.", "You found the strongest evidence and handled the tool-policy question."],
          ["Cool. I'd still lead with the five-times number.", "The speed claim without the quality story worries hiring managers."],
          ["That's too technical. Just say you're good with AI.", "You threw away the specifics that make the candidate credible."]] }
    ] }
];

/* ---------- Signal Check: strong signal or dig deeper? ---------- */

const SIGNALS = [
  { s: "Résumé: \"AI enthusiast and prompt engineering guru passionate about leveraging innovation.\"", good: false, why: "Labels with no tools, tasks or results. Ask for one concrete example." },
  { s: "Résumé: \"Built a Firefly and Photoshop template workflow that cut banner versioning from 3 days to 4 hours across 12 markets.\"", good: true, why: "Named tools, a workflow built for a team, and a measured outcome." },
  { s: "Résumé: \"Proficient in all AI tools.\"", good: false, why: "Nobody is. Ask which two they use most and what for." },
  { s: "Candidate: \"I set up a Claude Project with our brand voice guide. The team drafts with it, and I edit and fact-check every piece.\"", good: true, why: "A reusable team asset plus a review habit. Builder-level behavior." },
  { s: "Candidate: \"I paste client briefs and customer lists into whichever free AI tool is fastest.\"", good: false, why: "A data confidentiality problem. Many clients treat this as a deal-breaker." },
  { s: "Candidate: \"I can guarantee your brand the number one spot in ChatGPT answers.\"", good: false, why: "AI answers vary by person and day. Guarantees signal inexperience or overselling." },
  { s: "Candidate: \"We tracked 40 priority prompts in an AI visibility tool, restructured our FAQ content, and grew share of voice, though it is noisy month to month.\"", good: true, why: "A method, an action, a result, and honesty about uncertainty." },
  { s: "Candidate: \"I never review what the coding agent writes. It's better than me now.\"", good: false, why: "No verification. Probe for tests, review and accessibility checks." },
  { s: "Candidate: \"I prototyped onboarding in Figma Make, tested it with five users, then rebuilt the winner with engineering on our design system.\"", good: true, why: "Uses AI for speed, validates with users, and respects the system." },
  { s: "Portfolio: thirty beautiful images. No brief, no process, no mention of how they were made.", good: false, why: "Polish is cheap now. Ask for the problem, the decisions and what AI did." },
  { s: "Candidate: \"I rolled out AI lead scoring after a six-week data cleanup, and kept human approval on all outbound sends.\"", good: true, why: "Data first, guardrails in place. Exactly what marketing ops clients want." },
  { s: "Candidate: \"I used avatar video to localize compliance training into eight languages. Native speakers reviewed every script.\"", good: true, why: "Efficient use of AI with a proper accuracy review." },
  { s: "Client: \"We want someone who uses AI so we can pay half the rate.\"", good: false, why: "Misaligned expectation. AI-fluent specialists earn a premium. Reset before you search." },
  { s: "Candidate: \"I added a rules file and tests so the coding agent follows our accessibility standards.\"", good: true, why: "Improving the setup so mistakes do not repeat is a mark of real skill." },
  { s: "Résumé: fourteen AI course certificates, no work examples.", good: false, why: "Courses show interest. Ask how they applied any of it on real work." },
  { s: "Client: \"Legal approved Firefly and Copilot only. Everything customer-facing gets a brand review.\"", good: true, why: "A clear stack and controls. This client is ready to hire and easy to screen for." }
];

/* ---------- Jargon Decoder ---------- */

const JARGON = [
  ["LLM", "Large language model. The engine behind ChatGPT, Claude and Gemini."],
  ["Prompt", "The instruction you give an AI. Good prompts include context, examples and the format you want."],
  ["Agent", "AI that takes a goal and completes multiple steps on its own, using tools along the way."],
  ["MCP", "Model Context Protocol. A standard connector between AI assistants and tools like Figma or a CRM."],
  ["Hallucination", "When AI states something false with confidence. The reason fact-checking is essential."],
  ["Human in the loop", "A person reviews or approves AI work before it ships."],
  ["Guardrails", "Rules and limits placed on an AI system: what it can do, say or send."],
  ["RAG", "Retrieval-augmented generation. The AI looks up a company's own documents before answering."],
  ["Custom model", "A model trained or tuned on a brand's own style or data, like Firefly Custom Models."],
  ["Context window", "How much information an AI can consider at once."],
  ["Multimodal", "AI that handles more than text: images, audio and video too."],
  ["Evals", "Tests that measure whether an AI feature gives good answers. A key AI engineer skill."],
  ["Custom GPT / Project / Gem", "A saved, shareable version of an assistant with its own instructions and files."],
  ["Generative Fill", "Photoshop feature that adds, removes or extends image content from a text prompt."],
  ["Commercially safe", "AI trained on licensed content with terms that allow business use. Adobe's pitch for Firefly."],
  ["Content Credentials", "A label on an asset recording how it was made, including AI use."],
  ["Design system", "A brand's library of reusable components and rules. AI needs it to stay on-brand."],
  ["Design tokens", "The named values in a design system: colors, type sizes, spacing."],
  ["Prompt-to-app", "Tools that build a working app from a description: Figma Make, v0, Lovable, Bolt."],
  ["Vibe coding", "Building software by describing it to AI and accepting the result without close review."],
  ["Design engineer", "A hybrid who designs and ships front-end code."],
  ["AI engineer", "Builds AI features into products. Different from a developer who uses AI to code."],
  ["Rules file", "Instructions like CLAUDE.md or AGENTS.md that tell a coding agent how a codebase works."],
  ["AEO", "Answer engine optimization. Getting a brand cited in AI-generated answers."],
  ["GEO", "Generative engine optimization. Another name for AEO."],
  ["AI Overviews", "Google's AI-written summaries at the top of search results."],
  ["Zero-click", "A search where the person gets the answer without visiting any website."],
  ["Share of voice", "In AI search, how often a brand is mentioned compared with competitors across a set of prompts."],
  ["Schema markup", "Code that labels page content so search and AI engines understand it."],
  ["Brand voice guide", "A document describing how a brand writes, now written so AI tools can follow it."],
  ["GTM engineer", "Builds automated, AI-driven sales and marketing workflows. Go-to-market engineer."],
  ["AI avatar", "A synthetic on-screen presenter generated from a script, used in training video."]
];

/* ---------- Objection handlers (Field Kit) ---------- */

const OBJECTIONS = [
  ["\"AI means we need fewer people.\"", "Some tasks did shrink. What grew is the need for people who direct and check the work. Which tasks on this team has AI taken over, and what is still stuck in the backlog?"],
  ["\"We'll just have ChatGPT do it.\"", "That can work for drafts. Who briefs it, edits it, checks the facts and owns the brand voice? That is usually where the gap shows up."],
  ["\"We need someone who does everything with AI.\"", "AI widens what one person can cover, but depth still matters. If they could only nail two things in 90 days, which two?"],
  ["\"AI skills should make talent cheaper.\"", "The market is paying more for people who multiply a team's output with AI. Let's look at what the role needs to deliver and price it on that."],
  ["\"We don't know where to start.\"", "Start small: one use case, one contract specialist, 90 days, one number to move. Then decide what to hire for permanently."],
  ["\"We're worried about legal and brand risk.\"", "Reasonable. Let's write down which tools are approved and who reviews the work. I'll screen candidates against exactly that."]
];

/* ---------- Ranks and badges ---------- */

const RANKS = [
  [0, "Rookie"], [150, "Sourcer"], [400, "Recruiter"], [750, "Senior Recruiter"],
  [1150, "Account Lead"], [1600, "Practice Director"], [2000, "AI Whisperer"]
];

const BADGES = [
  { id: "first", name: "First Briefing", desc: "Finish any briefing" },
  { id: "scholar", name: "Well Briefed", desc: "Finish all ten briefings" },
  { id: "ace", name: "Clean Sheet", desc: "Score 5 out of 5 on any quiz" },
  { id: "master", name: "Full Table", desc: "Three stars on every quiz" },
  { id: "closer", name: "Closer", desc: "Earn an A on three call simulations" },
  { id: "radar", name: "Sharp Ear", desc: "14 or more correct in Signal Check" },
  { id: "speed", name: "Quick Draw", desc: "Score 150 or more in Tool Sort" },
  { id: "decoder", name: "Decoder", desc: "Mark every jargon card as known" },
  { id: "streak", name: "Three-Day Streak", desc: "Train three days in a row" },
  { id: "certified", name: "Certified", desc: "Pass the certification exam" }
];
