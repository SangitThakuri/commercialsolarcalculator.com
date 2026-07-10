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
