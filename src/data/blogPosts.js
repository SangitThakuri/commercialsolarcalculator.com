import { BLOG_CATEGORIES } from './blogCategories.js'
import { estimateReadingTime } from '../utils/readingTime.js'

const AUTHOR = 'Commercial Solar Calculator Team'

const RAW_POSTS = [
  {
    slug: 'how-commercial-solar-roi-is-calculated',
    title: 'How Commercial Solar ROI Is Actually Calculated',
    excerpt:
      "Sticker price divided by your bill isn't ROI. Here's the three-layer math installers rarely walk you through.",
    category: BLOG_CATEGORIES.FINANCIAL,
    illustration: 'financial-dashboard',
    publishDate: '2026-05-04',
    relatedCalculatorPaths: [
      '/commercial-solar-roi-calculator',
      '/solar-investment-calculator',
      '/solar-payback-calculator',
    ],
    relatedPostSlugs: ['understanding-macrs-depreciation', 'federal-solar-tax-credits-explained'],
    sections: [
      {
        paragraphs: [
          "If you've gotten a few solar quotes, you've probably seen an installer's ROI slide: system cost on one side, your monthly bill on the other, a payback number that looks great. It's not wrong, exactly — it's just incomplete. The real return on a commercial solar investment comes from three things stacking together, and most sales decks only show you one of them clearly.",
        ],
      },
      {
        heading: 'Layer one: the utility savings everyone shows you',
        paragraphs: [
          "This is the part every proposal gets right, because it's the easy part. You use less grid electricity, so you pay less. The nuance most quotes gloss over is escalation — utility rates don't sit still for 25 years. Commercial electricity rates have historically climbed a few percent a year, which means your savings in year 15 are meaningfully larger than your savings in year one. A payback estimate that ignores this understates your long-run return, sometimes by a lot.",
        ],
      },
      {
        heading: 'Layer two: the tax credit, which lands once',
        paragraphs: [
          "The Section 48E federal Investment Tax Credit knocks 30% off your system cost, but it's a one-time event tied to the tax year your system goes into service. This is where a lot of back-of-napkin math goes wrong: people subtract the full 30% from the cost and call it a day, without accounting for the fact that claiming the credit also reduces how much you can depreciate (more on that below). It's real money, but it's not quite as simple as \"cost minus 30%.\"",
        ],
      },
      {
        heading: 'Layer three: the depreciation shield nobody mentions',
        paragraphs: [
          "This is the layer that gets left out of most conversations entirely, and it's often worth nearly as much as the tax credit itself. Commercial solar equipment qualifies for 5-year MACRS depreciation — a dramatically faster write-off than the 39-year schedule most commercial building improvements get. Layer your combined federal and state tax rate on top of that accelerated depreciation, and you get a second, separate pile of cash back that has nothing to do with how much electricity you actually generate.",
          "Put together — utility savings that grow over time, a same-year tax credit, and a multi-year depreciation shield — the real payback period on a well-sized commercial system is usually shorter than the naive \"cost ÷ monthly bill\" math suggests, sometimes by two or three years.",
        ],
      },
      {
        heading: 'Why the discount rate matters more than people think',
        paragraphs: [
          "There's a fourth wrinkle worth knowing about if you're comparing solar against other uses of capital: the time value of money. A dollar saved in year 20 isn't worth the same as a dollar saved next year, and a simple payback calculation treats them identically. If you're presenting this to a CFO or a board, net present value (NPV) and internal rate of return (IRR) are the numbers that will actually get taken seriously alongside other capital projects — not just \"it pays for itself in 6 years.\"",
        ],
      },
    ],
  },
  {
    slug: 'understanding-macrs-depreciation',
    title: 'Understanding MACRS Depreciation for Commercial Solar',
    excerpt: 'The IRS lets you write off a solar system in 5 years, not 39. Here is what that is actually worth.',
    category: BLOG_CATEGORIES.TAX,
    illustration: 'tax-paperwork',
    publishDate: '2026-05-11',
    relatedCalculatorPaths: ['/solar-tax-credit-calculator', '/commercial-solar-roi-calculator'],
    relatedPostSlugs: ['federal-solar-tax-credits-explained', 'how-commercial-solar-roi-is-calculated'],
    sections: [
      {
        paragraphs: [
          'Most improvements to a commercial building — a new roof, an HVAC system, a parking lot — get depreciated over 39 years under IRS rules. Solar is a rare exception. The Modified Accelerated Cost Recovery System, MACRS for short, lets you write off commercial solar equipment over just 5 years. That difference alone is often the single largest tax benefit in a solar investment, and it frequently surprises business owners who only budgeted for the 30% tax credit.',
        ],
      },
      {
        heading: 'What "5-year property" actually means at tax time',
        paragraphs: [
          "5-year MACRS property doesn't mean you deduct 20% a year for 5 years — the IRS uses a declining-balance method under a half-year convention, so the deduction is front-loaded and technically spread across 6 tax years: roughly 20%, 32%, 19.2%, 11.52%, 11.52%, and 5.76% of your depreciable basis. In plain terms, you get the biggest write-off in year one and year two, tapering off from there. Each year's deduction reduces your taxable income, and multiplying that deduction by your combined federal and state tax rate is the actual cash benefit — what's often called a 'tax shield.'",
        ],
      },
      {
        heading: 'The basis-reduction rule that trips people up',
        paragraphs: [
          "Here's the detail that catches almost everyone off guard the first time: if you also claim the Section 48E Investment Tax Credit, IRS Section 50(c) requires you to reduce your depreciable basis by half the credit amount before you start depreciating. Say your system costs $300,000 and you claim a $90,000 credit (30%). You don't get to depreciate the full $300,000 — your depreciable basis is $300,000 minus half of $90,000, or $255,000. Skip this adjustment and you'll overstate your depreciation benefit, which is exactly the kind of thing that gets flagged in a tax review.",
        ],
      },
      {
        heading: 'A rough example, in real numbers',
        paragraphs: [
          "Take a $300,000 system with the basis-reduction rule applied: a $255,000 depreciable basis. At a combined 27% tax rate (21% federal plus a mid-range 6% state rate), that basis generates roughly $69,000 in tax savings over the depreciation schedule — on top of the $90,000 ITC. That's about $159,000 in combined tax benefits on a $300,000 system, before a single dollar of utility savings. It's why cash-flow-positive solar projects are common even before accounting for the electricity offset itself.",
        ],
      },
      {
        heading: 'Talk to your accountant before you sign anything',
        paragraphs: [
          "This article — and the calculator behind it — model the general federal rule, but depreciation interacts with your specific tax situation: whether you're profitable enough this year to use the deduction, whether bonus depreciation percentages have changed, and how your state treats accelerated depreciation (not every state conforms to federal MACRS rules). None of this replaces a conversation with a tax professional who can see your actual return, but knowing the mechanism means you'll ask better questions when you have that conversation.",
        ],
      },
    ],
  },
  {
    slug: 'federal-solar-tax-credits-explained',
    title: 'Federal Solar Tax Credits for Businesses, Explained Plainly',
    excerpt: 'Section 48E replaced the old ITC. Here is what actually qualifies your project for the full 30%.',
    category: BLOG_CATEGORIES.TAX,
    illustration: 'tax-paperwork',
    publishDate: '2026-05-18',
    relatedCalculatorPaths: [
      '/solar-tax-credit-calculator',
      '/commercial-solar-cost-calculator',
      '/commercial-solar-roi-calculator',
    ],
    relatedPostSlugs: ['understanding-macrs-depreciation', 'commercial-solar-financing-explained'],
    faq: [
      {
        question: 'Is the commercial solar tax credit still 30%?',
        answer:
          'Yes, for most commercial projects. Section 48E has a base rate of 6%, stepping up to 30% once a project meets prevailing wage and apprenticeship requirements — but systems under 1 MW (AC) are automatically exempt from that requirement and qualify for the full 30% rate outright.',
      },
      {
        question: 'Do I need to be profitable to use the tax credit?',
        answer:
          "You generally need sufficient tax liability to use the credit in the year it's generated, though unused credit can typically be carried back one year or forward up to 20 years, subject to the usual tax-credit carryover rules. Confirm your specific situation with a tax professional.",
      },
    ],
    sections: [
      {
        paragraphs: [
          "If you last looked at solar tax credits a few years ago, the name has changed even though the core idea hasn't: the old Section 48 Investment Tax Credit was replaced by Section 48E, the Clean Electricity Investment Credit, for projects placed in service after 2024. The mechanics are similar enough that most of what you remember still applies — but a few details are worth getting right before you assume your project automatically qualifies for the full rate.",
        ],
      },
      {
        heading: 'The base rate vs. the bonus rate',
        paragraphs: [
          "Section 48E starts at a 6% base credit rate. To reach the 30% rate most people think of as \"the\" solar tax credit, a project generally needs to satisfy prevailing wage and apprenticeship (PWA) requirements during construction. Here's the part that matters for most commercial rooftop projects: systems under 1 megawatt (AC) are automatically exempt from the PWA requirement and get the full 30% rate regardless. If you're sizing a typical warehouse, office, or retail rooftop system, you're very likely in that exempt category — it's the larger ground-mount and utility-adjacent projects where PWA compliance actually becomes a planning consideration.",
        ],
      },
      {
        heading: 'When the credit is claimed — and why timing matters',
        paragraphs: [
          "The credit is claimed on the tax return for the year the system is 'placed in service' — generally when it's installed, inspected, and capable of generating power, not necessarily the day you signed the contract. A project that finishes construction in December versus the following February can land in different tax years, which affects your cash flow planning and which year's tax liability the credit offsets. This is a genuinely useful thing to discuss with your EPC contractor and your accountant together, not separately.",
        ],
      },
      {
        heading: "Bonus adders most companies don't realize they qualify for",
        paragraphs: [
          "On top of the base 30%, Section 48E allows additional adders: a Domestic Content Bonus (+10 percentage points if a required share of steel, iron, and manufactured components are U.S.-made), and an Energy Community Bonus (+10 percentage points for projects in areas with historical fossil-fuel employment or brownfield sites). A separate, capacity-limited Low-Income Communities Bonus can add another 10-20 points for qualifying allocations. Stack enough of these and a project can clear 40-50% total credit — but eligibility depends on project-specific sourcing and location, and the low-income bonus specifically requires a competitive application, not automatic qualification. Don't assume a bonus rate applies; confirm it with your installer and tax advisor before it factors into your capital planning.",
        ],
      },
      {
        heading: "It's a credit, not a deduction — and that distinction is worth $1 for $1",
        paragraphs: [
          "One more thing worth being explicit about: a tax credit reduces your tax bill dollar for dollar, unlike a deduction, which only reduces the income your tax is calculated on. A $90,000 tax credit is $90,000 off what you owe. That's a meaningfully bigger deal than a $90,000 deduction, and it's part of why solar's combined tax treatment — credit plus accelerated depreciation — tends to outperform most other capital equipment purchases on an after-tax basis.",
        ],
      },
    ],
  },
  {
    slug: 'commercial-vs-residential-solar',
    title: 'Commercial Solar vs. Residential Solar: Why the Economics Are Different',
    excerpt: "It's not just a bigger version of a home system. The rate structure and tax treatment change everything.",
    category: BLOG_CATEGORIES.FINANCIAL,
    illustration: 'office-building',
    publishDate: '2026-05-25',
    relatedCalculatorPaths: ['/commercial-solar-roi-calculator', '/solar-panel-size-calculator'],
    relatedPostSlugs: ['how-commercial-solar-roi-is-calculated', 'demand-charges-explained'],
    sections: [
      {
        paragraphs: [
          "\"How is a warehouse rooftop system any different from just putting a lot of panels on a big roof?\" It's a fair question, and the honest answer is: the panels themselves aren't that different. What's genuinely different is the electricity rate structure you're offsetting and the tax mechanics available to a business that simply don't exist for a homeowner.",
        ],
      },
      {
        heading: 'Your electric bill isn\'t shaped like a residential bill',
        paragraphs: [
          "A residential bill is almost entirely volumetric — you pay a rate per kWh consumed, full stop. A commercial or industrial bill frequently adds a second, separate charge: a demand charge, based on your single highest 15-to-30-minute burst of power draw during the billing period, billed in dollars per kW regardless of how briefly that peak lasted. For many mid-to-large commercial accounts, demand charges make up 30-50% of the total bill. Solar generation offsets the energy charge portion well; it barely touches the demand charge unless it's paired with battery storage to actively shave that peak. A residential solar calculator that just multiplies kWh offset by a flat rate will overstate your actual commercial savings if it ignores this.",
        ],
      },
      {
        heading: 'Only a business gets the tax stack',
        paragraphs: [
          "A homeowner installing solar gets the residential version of the tax credit, but nothing resembling MACRS depreciation — depreciation is a business tax concept, not a personal one. A commercial property owner gets the 30% Section 48E credit and the 5-year accelerated depreciation shield described elsewhere on this site, often adding up to 40-55% of system cost recovered through tax benefits alone, before a single dollar of utility savings. This is the single biggest reason commercial paybacks often look better, percentage-wise, than a comparably sized residential system, even against a higher commercial electricity rate.",
        ],
      },
      {
        heading: 'Scale changes your negotiating position, too',
        paragraphs: [
          "A 40kW commercial rooftop system and a 400kW one aren't priced on the same per-watt curve — larger systems typically achieve a lower installed cost per watt due to fixed costs (permitting, mobilization, design) spreading across more capacity. It also means commercial buyers can reasonably request competitive bids from multiple EPC contractors and negotiate financing terms that simply aren't available at residential scale, from commercial PACE financing to larger project loans with more favorable rates.",
        ],
      },
      {
        heading: 'The takeaway',
        paragraphs: [
          "If someone hands you a residential solar app or a rule-of-thumb from a homeowner's experience and applies it to your commercial building, take the output with real skepticism. The physics of the panels are identical; the financial model underneath them is not.",
        ],
      },
    ],
  },
  {
    slug: 'battery-storage-for-businesses',
    title: 'Battery Storage for Businesses: Backup Power vs. Peak Shaving',
    excerpt: "Batteries solve two different problems. Confusing them leads to the wrong size and the wrong cost estimate.",
    category: BLOG_CATEGORIES.SYSTEM,
    illustration: 'battery-storage',
    publishDate: '2026-06-01',
    relatedCalculatorPaths: [
      '/battery-storage-calculator',
      '/commercial-demand-charge-calculator',
      '/solar-panel-size-calculator',
    ],
    relatedPostSlugs: ['demand-charges-explained', 'commercial-vs-residential-solar'],
    sections: [
      {
        paragraphs: [
          "When a client tells us they want \"a battery,\" the first question is always the same: what problem are you actually trying to solve? Backup power during an outage and reducing your demand charges are both legitimate reasons to install battery storage, but they lead to completely different sizing, and conflating them is the most common mistake we see in early planning conversations.",
        ],
      },
      {
        heading: "Problem one: keeping the lights on during an outage",
        paragraphs: [
          "This is the scenario most people picture: the grid goes down, and your battery keeps critical equipment running — refrigeration, servers, security systems — for however long you need. Sizing here is straightforward: multiply your critical load in kW by how many hours of backup you want, and that's your usable capacity in kWh. It's worth being honest with yourself about what's actually 'critical' — backing up an entire building for 24 hours costs a lot more than backing up a server room and a few refrigeration units for 4 hours, and most businesses only truly need the latter.",
        ],
      },
      {
        heading: "Problem two: shaving your demand charge",
        paragraphs: [
          "This is a completely different use case. Instead of running for hours during a rare outage, the battery discharges for a short window — often just an hour or two — during your predictable daily or monthly peak demand period, to reduce the single highest kW reading your utility bills you for. Because demand charges are billed on that one peak moment, even a modest, short-duration battery can meaningfully cut this portion of your bill if it's sized and controlled correctly. The battery here doesn't need nearly as much total capacity as a multi-hour backup system — it needs the right power rating and smart enough controls to discharge at exactly the right moment.",
        ],
      },
      {
        heading: "Can one battery do both?",
        paragraphs: [
          "Often, yes — with the right inverter and control software, the same battery can be programmed to discharge for peak-shaving on a normal day and switch to backup mode during an actual outage. But the sizing conversation should start from whichever use case is your priority, because a battery sized purely for a 2-hour peak-shave will run out fast in a genuine multi-hour outage, and a battery sized for 12 hours of backup is often oversized (and overpriced) for daily peak-shaving alone.",
        ],
      },
      {
        heading: 'A word on solar plus batteries together',
        paragraphs: [
          "One detail that surprises a lot of building owners: most grid-tied commercial solar systems automatically shut off during a utility outage, for safety reasons (this is called anti-islanding protection, and it protects utility line workers from a solar system unexpectedly energizing the grid). Solar panels alone do not keep your lights on during a blackout unless they're paired with battery storage and the correct inverter configuration. If backup power is part of why you're considering solar, that pairing isn't optional — it's the whole point.",
        ],
      },
    ],
  },
  {
    slug: 'demand-charges-explained',
    title: 'Demand Charges Explained: The Bill Solar Alone Won\'t Fix',
    excerpt: 'One 15-minute spike can set your bill for the whole month. Here is how that actually works.',
    category: BLOG_CATEGORIES.ENERGY,
    illustration: 'electricity-meter',
    publishDate: '2026-06-08',
    relatedCalculatorPaths: [
      '/commercial-demand-charge-calculator',
      '/battery-storage-calculator',
      '/commercial-electricity-cost-calculator',
    ],
    relatedPostSlugs: ['battery-storage-for-businesses', 'commercial-vs-residential-solar'],
    sections: [
      {
        paragraphs: [
          "Here's a scenario that trips up a lot of facility managers: your total electricity consumption for the month barely changed, but your bill went up noticeably. Nine times out of ten, the answer is demand charges — and if you've never had someone walk you through how they work, the bill can feel almost arbitrary.",
        ],
      },
      {
        heading: 'Two separate charges hiding in one bill',
        paragraphs: [
          "Most commercial and industrial electric bills combine two genuinely different charges. The energy charge is volumetric — cents per kWh, based on your total consumption, the part everyone understands intuitively. The demand charge is based on something else entirely: the single highest average power draw, usually measured over a 15-to-30-minute window, at any point during the billing period. You're billed in dollars per kW of that one peak, regardless of how briefly it lasted or how low your usage was the rest of the month.",
        ],
      },
      {
        heading: 'A concrete example',
        paragraphs: [
          "Imagine a commercial kitchen that runs steady equipment all day, but for one 20-minute stretch every morning, the walk-in freezer compressor, the ovens, and the HVAC all happen to kick on at once. That 20-minute spike — say it hits 180 kW — becomes your billed demand for the entire month, even if your average draw the rest of the time is 60 kW. At a typical demand rate of $15/kW, that spike alone adds $2,700 to your bill, driven by 20 minutes out of roughly 43,000 minutes in the month.",
        ],
      },
      {
        heading: "Why solar generation doesn't solve this by itself",
        paragraphs: [
          "Solar panels reduce how much power you pull from the grid throughout the day, which directly lowers your energy charge. But if your demand peak happens to occur when it's cloudy, early in the morning before the sun is strong, or simply outlasts what your system's output can offset in that moment, solar alone won't touch that number. This is the single most common reason a business installs solar, sees their overall bill drop, and is surprised the demand charge line item barely moved.",
        ],
      },
      {
        heading: 'What actually reduces demand charges',
        paragraphs: [
          "Two approaches, often combined: load management (staggering equipment startup so things like that freezer compressor and the ovens don't hit at the exact same moment), and battery storage, discharging for a short window specifically during your predictable peak to reduce grid draw at that moment. Because you're only shaving a short peak rather than running for hours, the battery capacity needed is often smaller than people expect — the math is closer to 'how many kW do I need to shave, for how long' than 'how many hours do I need to run the whole building.'",
        ],
      },
    ],
  },
  {
    slug: 'net-metering-explained',
    title: 'Net Metering Explained: What Happens When Your Panels Make More Than You Use',
    excerpt: 'Midday production often exceeds your load. What your utility does with the excess depends on your state.',
    category: BLOG_CATEGORIES.ENERGY,
    illustration: 'solar-farm',
    publishDate: '2026-06-15',
    relatedCalculatorPaths: [
      '/solar-panel-size-calculator',
      '/commercial-electricity-cost-calculator',
      '/roof-space-calculator',
    ],
    relatedPostSlugs: ['demand-charges-explained', 'how-commercial-solar-roi-is-calculated'],
    sections: [
      {
        paragraphs: [
          "A well-sized commercial solar system usually produces more power than the building needs around midday — that's by design, not a mistake. What happens to that excess electricity depends entirely on your utility's net metering policy, and it's worth understanding before you finalize a system size, because it directly affects your payback math.",
        ],
      },
      {
        heading: 'The basic idea',
        paragraphs: [
          "Net metering lets your excess solar production flow back onto the grid, and your utility credits you for it — effectively running your meter backward during high-production hours and forward when your building draws more than your panels produce. At the end of the billing period, you're billed (or credited) for the net difference. It's the mechanism that makes oversizing a system slightly beyond your average load a reasonable choice rather than wasted capacity.",
        ],
      },
      {
        heading: "Full retail credit isn't guaranteed everywhere",
        paragraphs: [
          "The generous version of net metering credits your excess production at the same retail rate you'd otherwise pay for grid power — a straightforward 1-for-1 trade. But policies vary significantly by state and utility, and many have moved toward alternatives: net billing, where excess exports are credited at a lower 'avoided cost' rate rather than the full retail rate, or time-of-use structures where the credit value depends on what time of day the export happened. Before finalizing a system size meant to significantly exceed your daytime load, confirm your specific utility's current export compensation structure — this single detail can shift your payback estimate more than people expect.",
        ],
      },
      {
        heading: 'How this should influence sizing',
        paragraphs: [
          "If your utility offers strong 1-for-1 net metering, there's more financial logic to sizing a system that produces a surplus during peak sun hours, since that surplus is worth close to full retail value. If your utility only offers a lower avoided-cost rate for exports, the better financial strategy usually shifts toward sizing closer to your own consumption pattern — maximizing self-consumption rather than export — and considering battery storage to shift your own excess production into hours when you'd otherwise be pulling from the grid, instead of selling it back cheaply.",
        ],
      },
      {
        heading: "Ask this question before you sign a proposal",
        paragraphs: [
          "Ask your installer directly: \"What is my utility's net metering or net billing policy, and how does it treat exported solar?\" A good commercial solar proposal should already reflect the answer in its savings estimate — if it doesn't mention it at all, that's worth asking about before you sign anything.",
        ],
      },
    ],
  },
  {
    slug: 'warehouse-solar-installation-guide',
    title: 'A Practical Guide to Solar for Warehouses and Distribution Centers',
    excerpt: 'Flat roofs, low daytime loads, and huge square footage make warehouses a distinct solar use case.',
    category: BLOG_CATEGORIES.INDUSTRY,
    illustration: 'warehouse',
    publishDate: '2026-06-22',
    relatedCalculatorPaths: [
      '/roof-space-calculator',
      '/solar-panel-size-calculator',
      '/commercial-solar-cost-calculator',
      '/commercial-solar-roi-calculator',
    ],
    relatedPostSlugs: ['commercial-vs-residential-solar', 'how-commercial-solar-roi-is-calculated'],
    sections: [
      {
        paragraphs: [
          "Warehouses and distribution centers are, in a lot of ways, close to an ideal solar use case: enormous flat roof area, relatively simple structural layouts, and often surprisingly low per-square-foot electricity consumption compared to the roof space available. That combination means warehouse solar economics frequently look better than a typical office building's, even though the building itself uses less power overall.",
        ],
      },
      {
        heading: 'Why the roof-to-load ratio matters so much here',
        paragraphs: [
          "A 150,000-square-foot distribution center might have modest electricity needs — lighting, dock doors, maybe some refrigeration or climate control for a portion of the space — relative to its roof size. That means the roof can often fit a system sized well beyond what the building itself consumes, at a genuinely low installed cost per watt thanks to the flat, unobstructed, easy-to-mount roof surface. The constraint is rarely 'will it fit' and much more often 'how much of this roof's potential actually makes financial sense to use,' which circles back to your utility's net metering policy for any production beyond your own load.",
        ],
      },
      {
        heading: 'Structural and roof-age considerations first',
        paragraphs: [
          "Before sizing anything, get a structural assessment — most warehouse roofs were engineered for their live load requirements, not necessarily with solar in mind, and rooftop weight limits, especially for older buildings, genuinely matter. Roof age and remaining lifespan matter just as much: installing a 25-year system on a roof with 8 years of membrane life left means either an expensive re-roof-and-remove-and-reinstall cycle down the line, or replacing the roof membrane before installation. A roof replacement coordinated with the solar installation, rather than done separately years apart, is usually the more cost-effective sequencing.",
        ],
      },
      {
        heading: 'HVAC units, skylights, and other obstructions',
        paragraphs: [
          "Warehouse roofs often host rooftop HVAC units, skylights, exhaust vents, and walkways for maintenance access, all of which reduce usable roof area below the raw square footage. A common planning assumption is that 60-75% of total roof area ends up usable after these obstructions and required setbacks — worth confirming with an actual site survey rather than assuming the full footprint is available.",
        ],
      },
      {
        heading: 'Where the real payback often comes from',
        paragraphs: [
          "Because warehouse buildings frequently qualify for the full 30% Section 48E credit at commercial rooftop scale (systems under 1 MW AC are exempt from prevailing wage requirements) plus the 5-year MACRS depreciation shield, the tax-driven portion of the return is often the majority of a warehouse project's early cash flow — sometimes recovering 40-50%+ of system cost in the first two tax years alone, well before 25 years of utility savings even factor in. That's the number sitting in the fine print of most warehouse solar pitches, and it's worth pulling to the front of the conversation, not the back.",
        ],
      },
    ],
  },
  {
    slug: 'commercial-solar-financing-explained',
    title: 'Solar Financing Options for Businesses: Cash, Loan, or Lease',
    excerpt: 'Owning and financing aren\'t the same decision. Here is who keeps the tax credit under each option.',
    category: BLOG_CATEGORIES.FINANCIAL,
    illustration: 'savings-chart',
    publishDate: '2026-06-29',
    relatedCalculatorPaths: [
      '/solar-financing-calculator',
      '/solar-loan-calculator',
      '/solar-lease-calculator',
    ],
    relatedPostSlugs: ['how-commercial-solar-roi-is-calculated', 'federal-solar-tax-credits-explained'],
    sections: [
      {
        paragraphs: [
          "\"Should we pay cash or finance it?\" is usually the second question a business asks about solar, right after \"how much does it cost?\" The honest answer is that it's really two separate decisions stacked on top of each other: whether you own the system at all, and if you do, whether you pay for that ownership up front or over time. Getting those two decisions confused is where most financing comparisons go sideways.",
        ],
      },
      {
        heading: 'Cash purchase: slower up front, best total return',
        paragraphs: [
          "Paying cash means you keep 100% of the tax credit, 100% of the depreciation benefit, and 100% of the utility savings, with no interest cost eating into any of it. It's the highest total-return option by a meaningful margin, and it's why cash purchase is often the default recommendation for a business with the capital available and enough tax liability to actually use the credit and depreciation shield. The tradeoff is obvious: it ties up capital that could theoretically be deployed elsewhere, and it front-loads a large expense in year one instead of spreading it out.",
        ],
      },
      {
        heading: 'A solar loan: you still own it, you just spread out the cost',
        paragraphs: [
          "A solar loan is the middle path that confuses people the least once it's explained: you still own the system, which means you still claim the tax credit and depreciation yourself, but you're paying it off over 5-10 years instead of on day one. The math that matters here is simple — does your monthly loan payment stay below your monthly utility savings? If yes, you're cash-flow-positive from month one, which is a genuinely appealing pitch even before the tax benefits land. The cost is interest, which reduces your total return compared to cash, but for a business that would rather preserve capital for other uses, a loan often beats writing one large check.",
        ],
      },
      {
        heading: "A lease or PPA: someone else owns it, someone else keeps the credit",
        paragraphs: [
          "This is where the ownership question actually changes hands. Under a lease or a power purchase agreement (PPA), a third party owns the system, claims the tax credit and depreciation themselves, and sells you either a fixed monthly payment (lease) or the electricity it generates at a set rate (PPA), usually below your utility's rate. The appeal is zero money down and no ownership responsibility — maintenance and performance risk sit with the owner, not you. The tradeoff is that you're giving up the tax benefits to someone else in exchange for that simplicity, which is why leases and PPAs almost always produce a lower total 25-year financial benefit than owning the same system outright, even though they're easier to say yes to.",
        ],
      },
      {
        heading: 'The question that actually decides it',
        paragraphs: [
          "Ignore the sales pitch for a moment and ask yourself one question: does your business have enough tax liability this year to actually use a 30% credit and an accelerated depreciation deduction? If yes, ownership — cash or loan — almost always wins on total return, and the loan-versus-cash choice becomes purely about how you'd rather manage your capital. If the honest answer is no — a newer business, a low-tax-liability year, a nonprofit with no tax bill at all — a lease or PPA can be the more realistic path to solar, because someone else using the tax benefits and passing along a discounted rate beats a business that can't use those benefits itself. Run the actual numbers side by side before deciding; don't let the financing structure get chosen by whichever contractor called first.",
        ],
      },
    ],
  },
  {
    slug: 'solar-system-sizing-guide',
    title: 'How to Size a Commercial Solar System Without Guessing',
    excerpt: 'Oversize it and you waste roof and budget. Undersize it and you leave savings on the table.',
    category: BLOG_CATEGORIES.SYSTEM,
    illustration: 'rooftop-solar',
    publishDate: '2026-07-03',
    relatedCalculatorPaths: ['/solar-panel-size-calculator', '/roof-space-calculator'],
    relatedPostSlugs: ['net-metering-explained', 'warehouse-solar-installation-guide'],
    sections: [
      {
        paragraphs: [
          "System sizing sounds like it should be simple — figure out how much power you use, build a system that makes that much. In practice, two things complicate that math: your roof might not have room for the ideal size, and your utility's export policy changes whether \"bigger than you need\" is even a good idea. Get sizing right and the rest of the financial model falls into place; get it wrong and you're either underdelivering on savings or paying for capacity you can't use well.",
        ],
      },
      {
        heading: 'Start from your usage, not your roof',
        paragraphs: [
          "The right starting point is your actual electricity consumption, not the available roof area. Pull 12 months of utility bills if you can — annual usage in kWh, and ideally how that usage is distributed across months, since a building with heavy summer cooling loads has a different ideal system size than one with flat year-round consumption. A system sized to your average monthly usage, with some margin for future growth, is the baseline before roof constraints or export economics enter the conversation.",
        ],
      },
      {
        heading: "Then check what your roof can actually hold",
        paragraphs: [
          "Once you know the target system size, the roof math determines whether it's achievable. A rough planning figure: standard commercial panels need about 18-20 square feet per installed kW once you account for spacing, mounting hardware, and required setbacks from roof edges and equipment. A roof crowded with HVAC units, skylights, and vents effectively loses that usable area — most planning estimates assume only 60-75% of raw roof square footage ends up usable after obstructions. If your target system size doesn't fit, you're choosing between a smaller system, a ground-mount supplement if land is available, or accepting a longer payback on a scaled-down design.",
        ],
      },
      {
        heading: "Oversizing isn't automatically wrong — it depends on net metering",
        paragraphs: [
          "If your utility offers strong 1-for-1 net metering, sizing a system modestly beyond your own consumption can make financial sense, since the surplus you export is credited near full retail value. If your utility instead pays a lower \"avoided cost\" rate for exports, oversizing stops paying for itself as efficiently, and the better strategy is usually sizing closer to your own load and maximizing self-consumption — potentially with battery storage to shift midday surplus into hours when you'd otherwise be buying from the grid. This single detail can change the \"right\" system size by 20-30% either direction.",
        ],
      },
      {
        heading: 'A sanity check before you commit',
        paragraphs: [
          "Before signing a proposal, ask your installer to walk you through three numbers explicitly: your actual annual usage, the proposed system's expected annual production, and what happens to any production beyond your usage under your specific utility's export rules. If a proposal can't clearly answer all three, that's a sign the sizing was built around what fits the roof rather than what fits your actual electricity needs and financial goals.",
        ],
      },
    ],
  },
  {
    slug: 'npv-irr-solar-investment-analysis',
    title: 'NPV and IRR for Solar: How CFOs Actually Evaluate the Investment',
    excerpt: '"It pays for itself in 6 years" doesn\'t mean much to a finance team. Here is the language that does.',
    category: BLOG_CATEGORIES.FINANCIAL,
    illustration: 'financial-dashboard',
    publishDate: '2026-07-08',
    relatedCalculatorPaths: ['/solar-investment-calculator', '/commercial-solar-roi-calculator'],
    relatedPostSlugs: ['how-commercial-solar-roi-is-calculated', 'commercial-solar-financing-explained'],
    sections: [
      {
        paragraphs: [
          "Simple payback period — how many years until utility savings recoup the cost — is the number most solar proposals lead with, and it's genuinely useful for a quick gut check. But if you're presenting a solar project alongside other capital requests to a finance team or a board, payback period alone tends to undersell the case, because it ignores something every other capital project on that list is judged by: the time value of money.",
        ],
      },
      {
        heading: "Why a dollar in year 20 isn't a dollar today",
        paragraphs: [
          "A simple payback calculation treats a dollar of savings in year one and a dollar of savings in year twenty as identical. Any finance team evaluating competing capital projects knows that's not how money actually works — a dollar available today can be invested, and a dollar promised in twenty years carries both inflation risk and opportunity cost. Net present value (NPV) and internal rate of return (IRR) are the two metrics that correct for this, and they're the language a CFO already uses to compare a solar project against a new piece of equipment, a facility expansion, or any other use of capital.",
        ],
      },
      {
        heading: 'NPV, in plain terms',
        paragraphs: [
          "Net present value discounts every future year's savings back to today's dollars using a chosen discount rate — often your company's cost of capital, or a hurdle rate finance uses for capital decisions — then subtracts your upfront net investment. A positive NPV means the project creates value above and beyond that discount rate; a negative NPV means it doesn't clear the bar, even if the simple payback period looked attractive. This is the number that answers \"is this actually a good use of our capital,\" not just \"does it eventually pay for itself.\"",
        ],
      },
      {
        heading: 'IRR, in plain terms',
        paragraphs: [
          "Internal rate of return is the discount rate at which a project's NPV works out to exactly zero — in other words, the annualized return the project effectively delivers over its life, expressed as a percentage you can directly compare against your other investment options. A commercial solar project with a well-structured tax position often produces a double-digit IRR, which is the number that makes it genuinely competitive against other capital projects a business might consider, not just \"a nice-to-have sustainability initiative.\"",
        ],
      },
      {
        heading: 'What actually drives these numbers for solar',
        paragraphs: [
          "Three things move NPV and IRR the most for a solar project: the discount rate you choose (a higher hurdle rate makes future savings worth less today, which lowers NPV), how quickly the tax credit and depreciation shield arrive (front-loaded benefits in years one and two boost both metrics meaningfully versus benefits spread evenly), and your assumed utility rate escalation (higher assumed inflation in electricity prices increases the value of savings in later years). When you're building the case internally, present the discount rate you used explicitly — finance teams will ask, and having already run the analysis at their preferred hurdle rate is far more persuasive than a payback-period slide alone.",
        ],
      },
    ],
  },
  {
    slug: 'commercial-ev-charging-economics',
    title: 'Commercial EV Charging: A Real Revenue and Payback Analysis',
    excerpt: 'Installing chargers is easy. Making them pay for themselves depends on utilization you can actually get.',
    category: BLOG_CATEGORIES.ENERGY,
    illustration: 'clean-energy',
    publishDate: '2026-07-13',
    relatedCalculatorPaths: ['/commercial-ev-charging-calculator', '/commercial-demand-charge-calculator'],
    relatedPostSlugs: ['demand-charges-explained', 'commercial-solar-financing-explained'],
    sections: [
      {
        paragraphs: [
          "Commercial EV charging gets pitched two ways: as a new revenue stream, or as a tenant/employee amenity that mostly pays for itself. Both can be true, but the financial case depends heavily on one number almost every rough estimate glosses over: how often those chargers actually get used, not how often you hope they will.",
        ],
      },
      {
        heading: 'Level 2 vs. DC fast charging is a completely different business model',
        paragraphs: [
          "A Level 2 charger is cheap to install and slow — appropriate for a workplace or retail lot where cars sit for hours, and the revenue model is usually a flat session fee or simply an amenity with no direct charge at all. A DC fast charger costs substantially more to install and interconnect, but delivers a full charge in 20-30 minutes, which supports a per-kWh or per-minute pricing model closer to a fuel station's economics. Comparing the installed cost of one against the other without accounting for this fundamentally different usage pattern is the single most common mistake in early EV charging proposals.",
        ],
      },
      {
        heading: "The demand charge risk nobody mentions upfront",
        paragraphs: [
          "Here's the detail that catches property owners off guard after installation, not before: DC fast chargers draw a lot of power in a short window, and if several vehicles charge simultaneously, that spike can set a new, much higher demand charge peak for your entire electric bill — the same demand charge mechanic that applies to any other equipment on your property. A charging station that looks profitable on a per-session basis can quietly get eaten by a demand charge increase that wasn't modeled into the original proposal. Any serious EV charging analysis needs to account for this alongside straightforward installation cost and session revenue.",
        ],
      },
      {
        heading: 'Utilization is the number that makes or breaks the model',
        paragraphs: [
          "A charger that sits empty 90% of the day generates close to nothing, no matter how good the per-session rate looks on paper. Realistic utilization depends heavily on location — a charger in a busy retail lot near a highway sees far more turnover than one in a low-traffic office park. Before committing to a specific charger count or type, get honest about expected daily sessions per charger, and build the payback estimate around a conservative utilization assumption, not an optimistic one. It's far easier to be pleasantly surprised by higher-than-expected usage than to explain why a six-figure installation isn't generating the revenue the pitch deck promised.",
        ],
      },
      {
        heading: 'Where solar and EV charging genuinely complement each other',
        paragraphs: [
          "Pairing EV charging with an on-site solar system can offset a meaningful share of the charging load with self-generated power, reducing the grid draw (and the demand charge exposure) that fast charging creates. It's not a requirement — plenty of standalone charging installations pencil out fine — but if you're already considering solar for a property, sizing it with EV charging load in mind, rather than treating them as two entirely separate projects, tends to produce a better combined result than evaluating each in isolation.",
        ],
      },
    ],
  },
  {
    slug: 'commercial-solar-cost-breakdown',
    title: 'What Solar Actually Costs: A Breakdown of Commercial Installation Pricing',
    excerpt: 'Panels are a smaller line item than most people assume. Here is where the rest of the money goes.',
    category: BLOG_CATEGORIES.FINANCIAL,
    illustration: 'inspection',
    publishDate: '2026-07-17',
    relatedCalculatorPaths: ['/commercial-solar-cost-calculator', '/commercial-solar-roi-calculator'],
    relatedPostSlugs: ['commercial-solar-financing-explained', 'solar-system-sizing-guide'],
    sections: [
      {
        paragraphs: [
          "Ask most people what makes up the cost of a commercial solar system, and they'll say \"the panels.\" In a typical turnkey installation, panels are usually a minority of total project cost — often somewhere around a quarter to a third. Knowing where the rest of the money actually goes makes it much easier to evaluate whether a quote is reasonable, and where there's genuine room to negotiate versus where the cost is essentially fixed.",
        ],
      },
      {
        heading: 'The equipment: panels, inverters, and racking',
        paragraphs: [
          "Solar panels themselves have gotten steadily cheaper over the past decade relative to total installed cost, which is exactly why they're no longer the majority line item people assume. Inverters — the equipment that converts the DC power panels produce into the AC power your building uses — are a meaningful cost on their own, and the choice between string inverters and microinverters/power optimizers affects both price and long-term performance monitoring. Racking and mounting hardware, which physically secures panels to a flat or sloped commercial roof, rounds out the core equipment cost and varies significantly based on roof type.",
        ],
      },
      {
        heading: 'Labor and installation: more variable than equipment',
        paragraphs: [
          "Installation labor cost swings more than equipment cost project to project, driven by roof accessibility, structural complexity, and local labor rates. A single-story warehouse with a simple flat roof and ground-level equipment staging installs faster and cheaper per watt than a multi-story building with rooftop access challenges. This is also where regional variation shows up most — the same system size can cost noticeably more in a high-labor-cost market than a lower-cost one.",
        ],
      },
      {
        heading: "Soft costs: the part quotes explain the least",
        paragraphs: [
          "Permitting, interconnection applications and utility fees, engineering and structural review, project design, and the EPC contractor's overhead and margin collectively make up what the industry calls \"soft costs\" — and they're frequently a larger share of total price than most customers expect, sometimes rivaling the equipment cost itself. These costs don't disappear on a bigger or smaller system in direct proportion; some are closer to fixed costs regardless of system size, which is part of why larger commercial systems tend to achieve a lower cost per watt than small ones — the soft costs get spread across more capacity.",
        ],
      },
      {
        heading: 'How to actually evaluate a quote',
        paragraphs: [
          "Ask for an itemized breakdown, not just a single all-in number — a contractor confident in their pricing should be able to show equipment, labor, and soft costs separately. Compare quotes on cost per watt, not total price alone, since system sizes vary between proposals. And be specific about what's included: some quotes bundle a full roof structural assessment and permitting into the price, others quote those as separate line items later. The lowest headline number isn't always the lowest actual cost once every line item is accounted for.",
        ],
      },
    ],
  },
]

export const BLOG_POSTS = RAW_POSTS.map((post) => ({
  ...post,
  author: AUTHOR,
  readingTimeMinutes: estimateReadingTime(post.sections),
})).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function getRelatedPosts(post, limit = 3) {
  const bySlug = new Map(BLOG_POSTS.map((item) => [item.slug, item]))
  const explicit = (post.relatedPostSlugs ?? []).map((slug) => bySlug.get(slug)).filter(Boolean)

  if (explicit.length >= limit) return explicit.slice(0, limit)

  const fallback = BLOG_POSTS.filter(
    (item) => item.slug !== post.slug && item.category === post.category && !explicit.includes(item),
  )

  return [...explicit, ...fallback].slice(0, limit)
}
