"use strict";
    const VERIFIED_PLACEHOLDER = "Not yet verified";
    const tools = [
      {name:"Flaticon",category:"Icons",description:"A large icon library for interface and graphic projects.",best:"Quick icon sourcing",limits:"Free-plan attribution and download limits need verification.",pros:"Broad library; multiple formats may be available.",cons:"Attribution and asset-specific license may apply.",license:"Check each asset's current license.",url:"https://www.flaticon.com/",status:"Unverified"},
      {name:"QR Code Monkey",category:"QR Codes",description:"Generate QR codes with visual customization options.",best:"Branded QR concepts",limits:"Limits and reuse terms need verification.",pros:"Branding options; supports common QR use cases.",cons:"Check destination, tracking, and print quality before use.",license:"Verify current terms.",url:"https://www.qrcode-monkey.com/",status:"Unverified"},
      {name:"Canva",category:"Design platforms",description:"Browser-based layouts for social posts, presentations, and quick graphics.",best:"Fast layouts",limits:"Some features and assets require a paid plan.",pros:"Approachable templates; quick collaboration.",cons:"Template-driven work can look familiar; asset terms vary.",license:"Check the license for each included asset.",url:"https://www.canva.com/",status:"Unverified"},
      {name:"Adobe Express",category:"Design platforms",description:"Quick branded graphics and content in Adobe's web and mobile tools.",best:"Social graphics",limits:"Free and premium feature availability needs verification.",pros:"Templates and Adobe integrations.",cons:"Features and assets vary by plan and region.",license:"Verify terms for each asset and output.",url:"https://www.adobe.com/express/",status:"Unverified"},
      {name:"Recraft",category:"AI",description:"AI-assisted image generation with vector-oriented workflows.",best:"Logos, icons, vector concepts",limits:"Free tier and public-output rules need verification.",pros:"Vector workflow; style consistency is highlighted in the supplied brief.",cons:"Free limits and output visibility may change.",license:"Verify output ownership and commercial terms.",url:"https://www.recraft.ai/",status:"Unverified"},
      {name:"Adobe Firefly",category:"AI",description:"Adobe's generative AI tools for images and design workflows.",best:"Adobe-connected generation",limits:"Free credits and feature access need verification.",pros:"Integrates with Adobe apps; trained on licensed content according to Adobe's product positioning.",cons:"Credit limits; commercial terms depend on product and context.",license:"Review current Adobe terms; no blanket guarantee.",url:"https://firefly.adobe.com/",status:"Unverified"},
      {name:"ChatGPT",category:"AI",description:"Conversational AI for briefs, concepts, copy, planning, and supported creative workflows.",best:"Creative planning and design copy",limits:"Free and paid tiers; usage limits and image features need verification.",pros:"Versatile; useful for ideation, critiques, and document work.",cons:"Generated visuals may need a specialized tool; outputs require review.",license:"Check current OpenAI terms for output ownership and commercial use.",url:"https://chatgpt.com/",status:"Unverified"},
      {name:"Claude",category:"AI",description:"Conversational AI for writing, document analysis, critiques, and structured thinking.",best:"Writing and creative strategy",limits:"Free messages and feature availability need verification.",pros:"Strong long-form reasoning and useful structured feedback.",cons:"Primary strengths are text and analysis; image generation varies.",license:"Check current Anthropic terms for output use and commercial rights.",url:"https://claude.ai/",status:"Unverified"},
      {name:"Google Fonts",category:"Fonts",description:"Browse type families for web and design projects.",best:"Finding web-ready type",limits:"Free to browse and download; check the selected font's license.",pros:"Large searchable catalog; common web embed options.",cons:"Font quality and language coverage vary by family.",license:"Many families use open licenses; verify each font.",url:"https://fonts.google.com/",status:"Unverified"},
      {name:"Fonts In Use",category:"Fonts",description:"An archive of typefaces shown in real-world design.",best:"Typography research",limits:"Free to browse; not a font download service.",pros:"Useful visual references and context.",cons:"Reference entries do not grant rights to the displayed work or fonts.",license:"Reference only; follow the source licenses.",url:"https://fontsinuse.com/",status:"Unverified"},
      {name:"iLoveIMG",category:"Image tools",description:"Browser tools for resizing, compressing, converting, and cropping images.",best:"Quick image edits",limits:"File, batch, and plan limits need verification.",pros:"Convenient common image operations.",cons:"Check upload privacy, file-size limits, and retention terms.",license:"Use only files you have rights to; verify service terms.",url:"https://www.iloveimg.com/",status:"Unverified"},
      {name:"Cosmos",category:"Inspiration",description:"A visual discovery and collecting space for references.",best:"Moodboards and visual research",limits:"Account and feature availability need verification.",pros:"Collect and organize visual references.",cons:"Respect original creators; references are not reusable assets.",license:"Reference only; check rights with the original source.",url:"https://www.cosmos.so/",status:"Unverified"},
      {name:"Same.energy",category:"Inspiration",description:"Visual search for finding related imagery and references.",best:"Finding visual directions",limits:"Availability and current features need verification.",pros:"Explore visual similarity and adjacent references.",cons:"Search results remain owned by their original creators.",license:"Reference only; verify original asset rights.",url:"https://same.energy/",status:"Unverified"},
      {name:"Gridpic",category:"Inspiration",description:"Placeholder entry from the supplied brief; exact product identity and URL need verification.",best:"Unverified",limits:"Unknown — verify product and plan.",pros:"Not assessed.",cons:"Exact tool identity is unclear.",license:"Unverified.",url:"",status:"Placeholder"},
      {name:"Inkscape",category:"Vector software",description:"Free, open-source vector illustration software.",best:"Editing SVG and vector artwork",limits:"Desktop software; no paid-plan limit stated here.",pros:"Editable vector tools; open-source project.",cons:"Learning curve; some professional workflows differ from commercial suites.",license:"Commercial use is generally possible under GPL; review the license and third-party assets.",url:"https://inkscape.org/",status:"Unverified"},
      {name:"Animos.app",category:"Animation",description:"Placeholder entry from the supplied brief; exact product identity, features, and URL need verification.",best:"Unverified",limits:"Unknown — verify product and plan.",pros:"Not assessed.",cons:"Exact tool identity is unclear.",license:"Unverified.",url:"",status:"Placeholder"},
      {name:"Kojima",category:"Placeholder",description:"Placeholder from the supplied brief; exact tool identity and URL need verification.",best:"Unverified",limits:"Unknown.",pros:"Not assessed.",cons:"Name may refer to multiple things.",license:"Unverified.",url:"",status:"Placeholder"},
      {name:"Freegame",category:"Placeholder",description:"Placeholder from the supplied brief; exact tool identity and URL need verification.",best:"Unverified",limits:"Unknown.",pros:"Not assessed.",cons:"Exact product identity is unclear.",license:"Unverified.",url:"",status:"Placeholder"}
    ];
    const aiTools = [
      {name:"Meta AI",best:"Realistic photos and quick ideas",strengths:"Free and easy to try; good photorealism (as described in the supplied brief).",weaknesses:"Less control; weaker text rendering.",limits:"Free access and daily limits: verify.",commercial:"Check current terms before commercial use.",badge:"Photorealistic",url:"https://www.meta.ai/"},
      {name:"Adobe Firefly",best:"Commercial-aware image workflows",strengths:"Integrates with Adobe apps; Adobe describes training sources as licensed content.",weaknesses:"Free credits are limited; terms vary by feature.",limits:"Credits and plan: verify.",commercial:"Review current Adobe terms; not a blanket guarantee.",badge:"Commercial-safe intent",url:"https://firefly.adobe.com/"},
      {name:"Recraft",best:"Logos, icons, and vector concepts",strengths:"SVG export and consistent styles are highlighted in the supplied brief.",weaknesses:"Free tier is limited; free outputs may be public.",limits:"Verify current tier and public-output settings.",commercial:"Verify current terms and output visibility.",badge:"Logos / vectors",url:"https://www.recraft.ai/"},
      {name:"Ideogram",best:"Text inside images and posters",strengths:"Strong typography rendering (as described in the supplied brief).",weaknesses:"Daily limits; free images may be public.",limits:"Daily limits: verify.",commercial:"Verify current terms and visibility.",badge:"Text in images",url:"https://ideogram.ai/"},
      {name:"Leonardo AI",best:"Game art, concept art, illustration",strengths:"Many styles and models; fine control.",weaknesses:"Token-based daily limits.",limits:"Token allowance: verify.",commercial:"Verify current plan and output terms.",badge:"Illustration",url:"https://leonardo.ai/"},
      {name:"Microsoft Designer / Copilot",best:"Social posts and quick graphics",strengths:"Easy to use; free access with an account is stated in the supplied brief.",weaknesses:"Less artistic range.",limits:"Availability and account requirements: verify.",commercial:"Check Microsoft terms for the feature and output.",badge:"Quick graphics",url:"https://designer.microsoft.com/"},
      {name:"Google ImageFX / Gemini",best:"General images and ideas",strengths:"Clean results and a simple interface (as described in the supplied brief).",weaknesses:"Availability varies by region.",limits:"Regional availability and limits: verify.",commercial:"Check current Google terms and regional rules.",badge:"General ideas",url:"https://gemini.google.com/"},
      {name:"ChatGPT",best:"Creative planning, design copy, and concept iteration",strengths:"Versatile conversation, image and document workflows vary by plan and feature.",weaknesses:"Visual generation and editing are less direct than specialized image tools.",limits:"Free tier availability and usage limits: verify.",commercial:"Check current OpenAI terms and workspace or plan rules.",badge:"Creative assistant",url:"https://chatgpt.com/"},
      {name:"Claude",best:"Writing, critique, briefs, and structured creative thinking",strengths:"Strong long-form reasoning and document analysis.",weaknesses:"Image-generation features are not the primary tool; availability and limits vary.",limits:"Free message and usage limits: verify.",commercial:"Check current Anthropic terms and applicable plan rules.",badge:"Writing & critique",url:"https://claude.ai/"}
    ];
    const formats = [
      ["SVG","Logos, icons, and illustrations","Infinitely scalable; often small; editable vector paths.","Not suited to photos or complex raster textures.","Avoid for photographs, complex textures, or apps that do not support SVG."],
      ["PNG","Transparency, screenshots, and crisp graphics","Lossless; supports transparency; broadly supported.","Large file sizes for photographs.","Avoid for large photos when a compressed format is more appropriate."],
      ["JPG","Photographs","Small files at useful quality; universal support.","Lossy compression; no transparency; artifacts around fine text.","Avoid for transparent artwork, logos, and crisp text-heavy graphics."],
      ["WebP","Web images","Usually smaller than PNG/JPG at comparable visual quality; supports transparency and animation.","Older software or workflows may not support it.","Avoid for print handoff or very old software without a fallback."],
      ["AVIF","Next-generation web photos","Excellent compression potential and strong image quality.","Editing and browser support vary by workflow.","Avoid when tool support or universal compatibility matters most."],
      ["GIF","Simple looping animation","Broad legacy support; simple to embed.","Limited to 256 colors; can create large files.","Avoid for quality animation; prefer MP4/WebM when appropriate."],
      ["PDF","Print, documents, and sharing","Can preserve page layout, fonts, and vector artwork when exported correctly.","Not ideal for responsive web imagery; export settings matter.","Avoid for displaying a single web image when an image format fits better."],
      ["EPS / AI","Professional vector source files and print vendors","Editable vector artwork; common in professional print handoffs.","Software compatibility varies; AI is Adobe's proprietary format.","Avoid for web display; export SVG, PNG, or PDF as needed."],
      ["PSD","Layered Photoshop work","Preserves layers, masks, and effects for editing.","Large; not a finished universal delivery format.","Avoid for final sharing when a flattened export is expected."],
      ["MP4 / WebM","Video and animated content","Efficient video delivery with broad web support.","Transparency support and codec support vary; MP4 generally does not carry alpha.","Avoid when you need guaranteed transparency; some WebM workflows support alpha."],
      ["Lottie (JSON)","UI and web animation","Can be compact, scalable, and interactive for supported animations.","Requires a compatible renderer; not accepted by many social platforms.","Avoid for social uploads or environments without a Lottie player."]
    ];
    const learnItems = [
      ["Vector vs. raster","Beginner","Vectors use paths that scale cleanly; raster images use pixels. Pick vectors for logos and icons, pixels for photos and textured images."],
      ["RGB vs. CMYK","Beginner","RGB is a light-based color model used by screens; CMYK is a print process model. Convert with a printer's profile and proof the result."],
      ["DPI / PPI: web vs. print","Beginner","Pixel dimensions determine screen image detail. Print dimensions and pixel density work together; 300 PPI is a common print target, not a universal rule."],
      ["Color theory","Beginner","Hue, saturation, value, and contrast shape how a palette feels. Start with a clear role for each color and test combinations for readability."],
      ["Typography pairing","Intermediate","Pair typefaces by contrast and shared details. Limit the number of families, establish hierarchy, and test real text at actual sizes."],
      ["Image & font licensing","Intermediate","A free download is not automatically free for every use. Check the exact asset license, attribution rules, client use, and redistribution restrictions."],
      ["Accessibility & contrast","Intermediate","Use semantic structure, keyboard support, readable contrast, descriptive alternatives, and more than color alone to convey meaning."],
      ["Logo file packages","Intermediate","Provide vector master files plus transparent raster exports, clear-space guidance, and light/dark variants where needed."],
      ["Print-ready exports","Advanced","Confirm dimensions, bleed, color profile, embedded/outlined fonts as required, image resolution, and the vendor's PDF preset."],
      ["Designing with grids","Intermediate","A grid gives alignment and rhythm; treat it as a flexible structure rather than a cage. Check spacing at multiple viewport widths."]
    ];
    const glossaryItems = [
      ["Aspect ratio","The proportional relationship between width and height, commonly written 16:9 or 1:1."],
      ["Bleed","Artwork that extends beyond the trim edge so tiny cutting shifts do not reveal an unprinted border."],
      ["CMYK","Cyan, magenta, yellow, and key/black: a subtractive color model used in many print workflows."],
      ["DPI / PPI","Dots per inch describes printer output; pixels per inch describes image pixel density at a physical size."],
      ["Kerning","Adjusting spacing between a specific pair of characters."],
      ["Leading","The vertical distance between lines of type."],
      ["Raster","An image made of a fixed grid of pixels; enlarging it too far can make it look soft or blocky."],
      ["RGB","Red, green, and blue: an additive color model used by screens and many digital images."],
      ["SVG","Scalable Vector Graphics: a text-based vector image format for paths and shapes."],
      ["Vector","Artwork described by paths and shapes rather than a fixed pixel grid."]
    ];
    const workflows = [
      {title:"Logo concept → clean vector",best:"A simple mark or wordmark",steps:["Sketch a few distinct directions and choose one idea to refine.","Use Recraft for concept exploration; check the current tier and output terms first.","Rebuild or clean the artwork in Inkscape so shapes and paths are intentional.","Export an SVG master and transparent PNG sizes for sharing.","Test legibility at small sizes and verify fonts/assets are licensed."]},
      {title:"Social post in Canva",best:"A quick campaign graphic",steps:["Choose a platform size; verify current specs before publishing.","Set a type hierarchy and a small palette before opening a template.","Build or adapt a Canva layout; check whether every asset is allowed on your plan.","Preview mobile readability and color contrast.","Export an appropriate PNG/JPG and keep an editable source copy."]},
      {title:"Branded QR code",best:"A campaign link or event",steps:["Use a stable HTTPS destination and test the link on mobile.","Generate a plain code with the browser QR tool or explore QR Code Monkey for branding.","Keep strong contrast and a clear quiet zone around the code.","Print a test at the final size and scan it from multiple devices.","Use a redirect you control if you need to change the destination later."]},
      {title:"Fast mockup presentation",best:"Showing a design in context",steps:["Find a mockup with a clear commercial-use license and attribution requirements.","Open a PSD in a compatible editor such as Photopea (verify current terms) or use a template tool.","Place your artwork, check crop and perspective, and avoid implying a real product endorsement.","Export a web-friendly image and keep the original layered file.","Credit the mockup creator when required by its license."]}
    ];
    const prompts = [
      {title:"Logo directions",label:"Logo",prompt:"Create 4 distinct logo direction concepts for [brand], a [type of organization] for [audience]. Explore [visual idea] using [2–3 colors]. Show simple, flat vector-like shapes on a plain background. No mockups, no tiny details, no existing brand marks. Keep any lettering blank so I can typeset it myself.",tips:"Use an image model for broad concept directions, then draw and refine the final vector yourself. Do not treat generated marks as cleared trademarks."},
      {title:"Editorial poster",label:"Poster",prompt:"Design a bold editorial poster about [topic] for [audience]. Use [visual metaphor], oversized geometric shapes, and a [color palette] palette. Leave a clean, empty area for the headline and event details. High contrast, intentional negative space, print-inspired composition. No logos or fabricated small text.",tips:"Ideogram may help explore text-in-image, but proofread every character and check output visibility and usage terms."},
      {title:"Product photo concept",label:"Product photo",prompt:"A studio product photograph concept for [product], on a [surface] with [lighting] and [mood]. Camera angle: [angle]. Background: [background]. Keep the product shape and label area clean, no fake brand names, no extra objects, no watermark.",tips:"Use photoreal models for art direction exploration; do not present synthetic scenes as documentary product evidence."},
      {title:"Icon family",label:"Icons",prompt:"A cohesive set of 6 simple icons for [app or topic]: [list concepts]. Use one consistent [stroke weight] outline style, rounded corners, a square viewBox, balanced negative space, and one-color black shapes on transparent-looking plain background. No letters, gradients, shadows, or existing symbols.",tips:"Rebuild the selected ideas as actual editable vectors; check accessibility and avoid confusingly similar protected symbols."},
      {title:"Repeat pattern",label:"Pattern",prompt:"A seamless repeating pattern inspired by [subject], using [palette]. Make the motifs [style], vary their scale subtly, keep spacing balanced, and ensure the edges tile cleanly. No text, logos, or recognizable copyrighted characters.",tips:"Inspect the repeat edges and check licensing before using generated patterns in products or client work."}
    ];
    const resources = [
      ["Fonts","Google Fonts","Browse type families; verify the license for each family and the correct embedding terms.","https://fonts.google.com/","Fonts"],
      ["Stock images","Unsplash","A source for imagery; confirm the current license and any model/property rights for each use.","https://unsplash.com/","Image tools"],
      ["Mockups","Mockup World","Directory-style mockup discovery; check the original creator's license and attribution requirements.","https://www.mockupworld.co/","Mockups"],
      ["Icon packs","Flaticon","Large icon library; free use may require attribution and asset-level terms apply.","https://www.flaticon.com/","Icons"],
      ["Textures","Poly Haven","Open asset library with CC0 assets according to its stated licensing; still check each asset page.","https://polyhaven.com/","Textures"],
      ["Color palettes","Coolors","Palette discovery and generation; verify current free features and account requirements.","https://coolors.co/","Color"],
      ["Creative Commons search","Openverse","Search across openly licensed and public-domain media; verify the source license and attribution for each item.","https://openverse.org/","Licensing"]
    ];
    const alternatives = [
      ["Photoshop","Photopea · GIMP · Krita","Photopea: familiar browser editor; GIMP: broad raster editing; Krita: illustration and painting.","Tradeoffs include interface differences, workflow compatibility, and learning curve.","Best for: photo edits, raster graphics, and painting."],
      ["Illustrator","Inkscape · Figma free tier · Vectr","Inkscape: open-source vectors; Figma: collaborative interface work; Vectr: simple vector tasks.","Check feature limits, offline needs, and export requirements.","Best for: vector artwork, UI, and simple graphics."],
      ["Figma paid tiers","Penpot · Figma free tier · Lunacy","Penpot: open-source design/collaboration option; Figma free tier: familiar entry point; Lunacy: another design app to evaluate.","Team, file, library, and collaboration limits can change; verify each option's current free plan.","Best for: interface design and collaborative prototyping."],
      ["InDesign","Scribus · Canva · LibreOffice Draw","Scribus: desktop page layout; Canva: quick templated documents; LibreOffice Draw: simple page and diagram work.","Professional prepress workflows and fine typographic controls may differ.","Best for: brochures, flyers, and short documents."],
      ["Lightroom","Darktable · RawTherapee · digiKam","Free photo workflows with different approaches; digiKam adds photo organization and management features.","Expect setup and workflow learning; verify camera support and current features.","Best for: raw photo development and catalog workflows."],
      ["Premiere Pro","DaVinci Resolve · CapCut · Kdenlive","Resolve offers editing and color workflows; CapCut offers quick social video editing; Kdenlive is a free desktop editor.","Hardware needs, plan terms, and feature availability differ.","Best for: longer-form editing or quick social cuts."],
      ["After Effects","Blender · DaVinci Fusion · Natron","Blender: 3D and motion graphics; Fusion: node-based compositing in Resolve; Natron: open-source compositing.","Not one-to-one replacements; each has a different workflow curve.","Best for: 3D motion, compositing, and visual effects."],
      ["Canva Pro","Adobe Express · Canva free tier · VistaCreate","Explore free-tier templates and editing across these design platforms.","Premium assets, storage, and brand features may be limited; verify current plans.","Best for: lightweight branded content and social graphics."]
    ];
    const alternativeOptions = {
      "Photoshop": [
        ["Photopea","Browser-based editing with PSD-oriented workflows.","Browser access, file support, and privacy terms need checking.","Quick layered-file edits.","https://www.photopea.com/"],
        ["GIMP","Desktop raster editing with an open-source workflow.","Interface and plugin workflows differ from Photoshop.","Photo edits and raster graphics.","https://www.gimp.org/"],
        ["Krita","Painting and illustration tools with a desktop workflow.","Photo-retouching and asset-management workflows differ.","Digital painting and illustration.","https://krita.org/"]
      ],
      "Illustrator": [
        ["Inkscape","Open-source vector illustration and SVG editing.","AI-file fidelity and print-vendor compatibility need checking.","SVG artwork, icons, and vector learning.","https://inkscape.org/"],
        ["Figma free tier","Collaborative interface design with vector drawing tools.","Not a full substitute for illustration and print-prepress workflows; verify current plan limits.","UI design and collaborative prototypes.","https://www.figma.com/"],
        ["Vectr","A lightweight entry point for vector graphics.","Current availability, export options, and plan terms need verification.","Simple vector tasks and quick graphics.","https://www.vectr.com/"]
      ],
      "Figma paid tiers": [
        ["Penpot","Open-source design and prototyping workflows.","Import fidelity, integrations, and collaboration needs may differ.","Collaborative interface design.","https://penpot.app/"],
        ["Figma free tier","Stay in the same ecosystem while evaluating a free plan.","Free-tier file, team, library, and feature caps can change.","Small projects or individual exploration.","https://www.figma.com/"],
        ["Lunacy","A design app to evaluate for interface and vector workflows.","Platform support, asset terms, and current features need verification.","Exploring another design-app workflow.","https://icons8.com/lunacy"]
      ],
      "InDesign": [
        ["Scribus","Desktop page-layout workflows with open-source software.","Prepress setup and typography workflows may take extra learning.","Brochures and print page layouts.","https://www.scribus.net/"],
        ["Canva","Templated layouts for quick documents and graphics.","Fine-grained long-document layout and print controls may be limited.","Short documents and fast marketing layouts.","https://www.canva.com/"],
        ["LibreOffice Draw","Simple page, diagram, and document graphics.","Not aimed at complex editorial publishing or advanced prepress.","Basic flyers, diagrams, and one-page documents.","https://www.libreoffice.org/"]
      ],
      "Lightroom": [
        ["Darktable","A non-destructive raw photo development workflow.","Catalog and editing workflows differ; check camera support.","Raw photo development.","https://www.darktable.org/"],
        ["RawTherapee","Detailed raw processing and image adjustments.","Workflow and library-management needs may differ.","Raw processing and image quality experiments.","https://rawtherapee.com/"],
        ["digiKam","Photo-library organization and metadata workflows.","Not a one-to-one Lightroom editing/catalog experience.","Organizing photo collections and metadata.","https://www.digikam.org/"]
      ],
      "Premiere Pro": [
        ["DaVinci Resolve","Video editing with color and post-production tools.","Hardware demands and workflow learning can be substantial.","Editing and color-focused projects.","https://www.blackmagicdesign.com/products/davinciresolve"],
        ["CapCut","Quick video workflows aimed at social content.","Current free features, platform availability, and privacy terms need checking.","Short social edits.","https://www.capcut.com/"],
        ["Kdenlive","Desktop video editing in an open-source workflow.","Templates, integrations, and workflow differ from Premiere.","General desktop video editing.","https://kdenlive.org/"]
      ],
      "After Effects": [
        ["Blender","3D, motion graphics, and compositing in a broad creative suite.","Different interface and animation model; not a direct project-file replacement.","3D motion and custom animation.","https://www.blender.org/"],
        ["DaVinci Fusion","Node-based compositing within the Resolve ecosystem.","Node workflow and project interchange differ from After Effects.","Compositing and effects work.","https://www.blackmagicdesign.com/products/davinciresolve/fusion"],
        ["Natron","Node-based compositing in an open-source application.","Current maintenance, compatibility, and integration needs should be checked.","Compositing experiments and node workflows.","https://natrongithub.github.io/"]
      ],
      "Canva Pro": [
        ["Adobe Express","Quick branded graphics and template-based content.","Premium assets and features can be plan-limited; verify current terms.","Social posts and lightweight branded content.","https://www.adobe.com/express/"],
        ["Canva free tier","Keep existing Canva workflows while using free features.","Some assets, brand tools, and plan features may require payment.","Individual projects and basic templates.","https://www.canva.com/"],
        ["VistaCreate","Template-based graphics and social content.","Current free features, account requirements, and asset terms need checking.","Quick marketing graphics and social layouts.","https://create.vista.com/"]
      ]
    };
    const sheets = [
      ["File Formats","SVG for scalable vector artwork; PNG for transparency; JPG for photos; WebP for modern web delivery; PDF for documents and print; keep source files for future edits."],
      ["RGB vs CMYK + DPI","RGB is for light-emitting screens; CMYK is common for print. Set physical size and effective PPI together; confirm color profile, bleed, and resolution with the print vendor."],
      ["Logo Package Checklist","Include editable vector master; SVG; transparent PNG; light/dark variants; horizontal/stacked lockups; favicon/app icon; color and clear-space notes; font and asset license details."],
      ["Brand Kit Checklist","Logo files; color values; type hierarchy; imagery direction; voice notes; templates; usage examples; accessibility checks; source and license records."],
      ["Social Media Sizes","Square 1080×1080; portrait 1080×1350; story 1080×1920; landscape/link preview 1200×630. These are starting points only—verify current platform specs."]
    ];
    const formatRecs = {
      web:"WebP or JPG for photos; SVG for simple vector artwork; PNG when transparency or lossless detail is needed. Keep a fallback where support matters.",
      print:"PDF from the print vendor's required preset. Confirm bleed, color profile, fonts, and image resolution with the printer.",
      logo:"Keep a vector master such as SVG (and any source format your collaborator needs), plus transparent PNG exports for easy sharing.",
      photo:"JPG for broad compatibility; WebP or AVIF for web delivery when your pipeline supports them. Preserve an original.",
      animation:"MP4 or WebM for video; Lottie for supported app/web UI motion. Check alpha/transparency and target platform support."
    };

    const $ = (selector, root=document) => root.querySelector(selector);
    const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));
    const listen = (selector, event, handler) => { const element=$(selector); if(element) element.addEventListener(event,handler); };
    const state = {category:"All", favoritesOnly:false, favorites:[], compare:new Set(), query:""};
    const status = (message) => { const el=$("#search-status"); if (el) el.textContent=message; };
    try {
      const saved=JSON.parse(localStorage.getItem("fdt-favorites") || "[]");
      if (Array.isArray(saved)) state.favorites=saved.filter(name=>tools.some(tool=>tool.name===name));
    } catch (error) {
      status("Saved favorites could not be read from this browser. You can still use the directory for this visit.");
    }

    function safeText(value) { return String(value).replace(/[&<>"']/g, ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch])); }
    function saveFavorites() {
      try { localStorage.setItem("fdt-favorites", JSON.stringify(state.favorites)); }
      catch (error) { status("Favorites are saved for this visit only because browser storage is unavailable."); }
      const count=$("#favorite-count");
      if(count) count.textContent=`${state.favorites.length} saved`;
    }
    function toolCard(tool, featured=false) {
      const search = [tool.name,tool.category,tool.description,tool.best,tool.limits,tool.pros,tool.cons,tool.license].join(" ");
      const noUrl = !tool.url;
      const freeTag = tool.category==="AI" || tool.category==="Design platforms" ? "Free / Freemium" : "Free access · verify";
      const commercialOk = tool.name==="Inkscape";
      const id=`tool-${tool.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}`;
      return `<article class="card tool-card${featured?" featured-card":""}" id="${id}" data-tool="${safeText(tool.name)}" data-category="${safeText(tool.category)}" data-search="${safeText(search)}">
        <div class="card-title-row"><h3>${safeText(tool.name)}</h3><span class="tag">${safeText(tool.category)}</span></div>
        <div class="tag-row"><span class="tag">${freeTag}</span><span class="tag ${commercialOk?"tag-ok":"tag-unknown"}">${commercialOk?"Commercial use OK · verify assets":"Commercial terms unverified"}</span>${tool.status==="Placeholder"?'<span class="tag tag-accent">Placeholder</span>':''}</div>
        <p>${safeText(tool.description)}</p><p class="meta"><strong>Best for:</strong> ${safeText(tool.best)}</p>
        <details class="tool-details">
          <summary>Free limits, pros &amp; license</summary>
          <div class="tool-details-body">
            <p class="meta"><strong>Free-plan limits:</strong> ${safeText(tool.limits)}</p>
            <p class="meta"><strong>Pros:</strong> ${safeText(tool.pros)}</p><p class="meta"><strong>Cons:</strong> ${safeText(tool.cons)}</p>
            <p class="meta"><strong>License:</strong> ${safeText(tool.license)}</p>
          </div>
        </details>
        <p class="meta"><strong>Verification:</strong> <span class="tag tag-unknown">${VERIFIED_PLACEHOLDER}</span></p>
        <div class="row-bottom">${noUrl?'<span class="tag tag-unknown">Verify exact tool and URL</span>':`<a class="button" href="${safeText(tool.url)}" target="_blank" rel="noopener noreferrer">Visit ↗</a>`}
          <button type="button" class="fav" data-favorite="${safeText(tool.name)}" aria-pressed="${state.favorites.includes(tool.name)}" aria-label="${state.favorites.includes(tool.name)?"Remove":"Add"} ${safeText(tool.name)} ${state.favorites.includes(tool.name)?"from":"to"} favorites">${state.favorites.includes(tool.name)?"♥ Saved":"♡ Save"}</button>
          ${featured?"":`<button type="button" class="compare-toggle" data-compare="${safeText(tool.name)}" aria-pressed="${state.compare.has(tool.name)}" aria-label="Select ${safeText(tool.name)} for comparison">Compare</button>`}
        </div>
      </article>`;
    }
    function renderFeatured() {
      if(!$("#featured-tools")) return;
      const picks=["Canva","Inkscape","Google Fonts","Recraft"].map(name=>tools.find(tool=>tool.name===name));
      $("#featured-tools").innerHTML=picks.map(tool=>toolCard(tool,true)).join("");
    }
    function renderTools() {
      if(!$("#tool-grid")) return;
      const cats=["All",...new Set(tools.map(tool=>tool.category))];
      $("#tool-filters").innerHTML=cats.map(category=>`<button type="button" data-category-filter="${safeText(category)}" aria-pressed="${state.category===category}">${safeText(category)}</button>`).join("");
      const list=tools.filter(tool=>(state.category==="All"||tool.category===state.category)&&(!state.favoritesOnly||state.favorites.includes(tool.name))&&(!state.query||[tool.name,tool.category,tool.description,tool.best,tool.limits,tool.pros,tool.cons,tool.license].join(" ").toLowerCase().includes(state.query)));
      $("#tool-grid").innerHTML=list.map(tool=>toolCard(tool)).join("");
      $("#tools-empty").style.display=list.length?"none":"block";
      $("#favorite-count").textContent=`${state.favorites.length} saved`;
      const clearButton=$("#favorites-clear");
      if(clearButton){
        clearButton.hidden=state.favorites.length===0;
        clearButton.disabled=state.favorites.length===0;
      }
      $("#favorites-filter").setAttribute("aria-pressed",String(state.favoritesOnly));
      $("#favorites-filter").textContent=state.favoritesOnly?"♥ Show all tools":"♥ Show saved only";
      $("#compare-panel").classList.toggle("active",state.compare.size>0);
      $("#compare-count").textContent=`${state.compare.size} selected · choose up to 3 tools`;
    }
    function renderAI() {
      if(!$("#ai-body")) return;
      $("#ai-body").innerHTML=aiTools.map(tool=>`<tr data-search="${safeText(Object.values(tool).join(" "))}"><td><a class="table-link" href="${safeText(tool.url)}" target="_blank" rel="noopener noreferrer">${safeText(tool.name)} ↗</a><br><span class="tag">${safeText(tool.badge)}</span><br><span class="meta">Verification: ${VERIFIED_PLACEHOLDER}</span></td><td>${safeText(tool.best)}</td><td>${safeText(tool.strengths)}</td><td>${safeText(tool.weaknesses)}</td><td>${safeText(tool.limits)}</td><td>${safeText(tool.commercial)} <span class="tag tag-unknown">Unverified</span></td></tr>`).join("");
    }
    function renderFormats() {
      if(!$("#format-grid")) return;
      $("#format-grid").innerHTML=formats.map(([name,best,pros,cons,avoid])=>`<details data-search="${safeText([name,best,pros,cons,avoid].join(" "))}"><summary>${safeText(name)} <span class="meta">· ${safeText(best)}</span></summary><div class="details-body"><p><strong>What it is / best use:</strong> ${safeText(best)}.</p><p class="good">Pros: ${safeText(pros)}</p><p class="bad">Cons: ${safeText(cons)}</p><p><strong>Avoid when:</strong> ${safeText(avoid)}</p></div></details>`).join("");
    }
    function renderLearn() {
      const grid=$("#learn-grid"),glossary=$("#glossary");
      if(grid) grid.innerHTML=learnItems.map(([title,level,description])=>`<article class="card learn-card" data-search="${safeText([title,level,description].join(" "))}"><span class="level">${safeText(level)}</span><h3>${safeText(title)}</h3><p>${safeText(description)}</p><button type="button" class="copy-button" data-copy="${safeText(`${title}: ${description}`)}">Copy notes</button></article>`).join("");
      if(glossary) glossary.innerHTML=glossaryItems.map(([term,description])=>`<details data-search="${safeText(`${term} ${description}`)}"><summary>${safeText(term)}</summary><div class="details-body"><p>${safeText(description)}</p></div></details>`).join("");
    }
    function renderWorkflows() {
      if(!$("#workflow-grid")) return;
      $("#workflow-grid").innerHTML=workflows.map(workflow=>`<article class="card workflow-card" data-search="${safeText([workflow.title,workflow.best,...workflow.steps].join(" "))}"><span class="tag">Best for: ${safeText(workflow.best)}</span><h3>${safeText(workflow.title)}</h3><ol class="numbered-list">${workflow.steps.map(step=>`<li>${safeText(step)}</li>`).join("")}</ol><button type="button" class="copy-button" data-copy="${safeText(`${workflow.title}\n${workflow.steps.map((step,index)=>`${index+1}. ${step}`).join("\n")}`)}">Copy workflow</button></article>`).join("");
    }
    function renderPrompts() {
      if(!$("#prompt-grid")) return;
      $("#prompt-grid").innerHTML=prompts.map((prompt,index)=>`<article class="card prompt-card" data-search="${safeText([prompt.title,prompt.label,prompt.prompt,prompt.tips].join(" "))}"><span class="tag">${safeText(prompt.label)}</span><h3>${safeText(prompt.title)}</h3><div class="placeholder-image" role="img" aria-label="Example image placeholder for ${safeText(prompt.label)}">Example visual placeholder · add a cleared reference or generated sample</div><div class="prompt-text" id="prompt-${index}">${safeText(prompt.prompt)}</div><p class="meta"><strong>Tip:</strong> ${safeText(prompt.tips)}</p><button type="button" class="copy-button" data-copy-target="prompt-${index}">Copy prompt</button></article>`).join("");
    }
    function renderResources() {
      if(!$("#resource-grid")) return;
      $("#resource-grid").innerHTML=resources.map(([category,name,license,url,best])=>`<article class="card" data-search="${safeText([category,name,license,best].join(" "))}"><span class="tag">${safeText(category)}</span><h3>${safeText(name)}</h3><p>${safeText(license)}</p><p class="meta"><strong>Best for:</strong> ${safeText(best)}</p><p class="meta"><strong>License note:</strong> verify the specific asset before use.</p><a class="button" href="${safeText(url)}" target="_blank" rel="noopener noreferrer">Explore ↗</a></article>`).join("");
    }
    function renderAlternatives() {
      if(!$("#alternatives-grid")) return;
      $("#alternatives-grid").innerHTML=alternatives.map(([paid,options,pros,cons,best])=>{
        const slug=paid.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
        return `<article class="card" data-search="${safeText([paid,options,pros,cons,best].join(" "))}"><span class="tag tag-accent">Instead of ${safeText(paid)}</span><h3>${safeText(options)}</h3><p><strong>Pros:</strong> ${safeText(pros)}</p><p><strong>Tradeoffs:</strong> ${safeText(cons)}</p><p class="meta"><strong>${safeText(best)}</strong></p><span class="tag tag-unknown">Free tier / terms unverified</span><a class="inline-link" href="alternatives/${slug}.html">Compare ${safeText(paid)} alternatives →</a></article>`;
      }).join("");
    }
    function renderAlternativeDetail() {
      const output=$("#alternative-detail-content");
      if(!output) return;
      const slug=document.body.dataset.alternative;
      const alternative=alternatives.find(([paid])=>paid.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")===slug);
      if(!alternative){output.innerHTML='<div class="notice notice-warning">This alternative guide could not be found. <a href="../alternatives.html">Return to alternatives</a>.</div>';return;}
      const [paid,names,pros,cons,best]=alternative;
      const options=names.split(" · ");
      const bestFor=best.replace(/^Best for:\s*/i,"");
      const details=alternativeOptions[paid]||[];
      output.innerHTML=`<p class="eyebrow">Free alternatives to</p><h1>${safeText(paid)}<span class="accent-text">.</span></h1><p class="section-intro">${safeText(bestFor)} Compare starting points before deciding; these products are not one-to-one replacements.</p><div class="notice notice-warning" style="margin:1rem 0">Product descriptions, free-plan details, and licenses are unverified and can change. Visit each official product and read its current terms before client or commercial use.</div><div class="grid">${options.map((name,index)=>{const [,upside,tradeoffs,optionBest,url]=details[index]||[name,pros,cons,bestFor,""];return `<article class="card" data-search="${safeText(`${paid} ${name} ${upside} ${tradeoffs} ${optionBest}`)}"><span class="tag">Option ${index+1}</span><h2>${safeText(name)}</h2><p><strong>Potential upside:</strong> ${safeText(upside)}</p><p><strong>Tradeoffs:</strong> ${safeText(tradeoffs)}</p><p class="meta"><strong>Best for:</strong> ${safeText(optionBest)}</p><span class="tag tag-unknown">Free plan / license: verify</span>${url?`<a class="button" href="${safeText(url)}" target="_blank" rel="noopener noreferrer">Visit official site ↗</a>`:""}</article>`;}).join("")}</div><p style="margin-top:1.2rem"><a class="button" href="../alternatives.html">← All alternatives</a></p>`;
    }
    function renderSheets() {
      if(!$("#sheet-grid")) return;
      $("#sheet-grid").innerHTML=sheets.map(([title,body],index)=>`<article class="card" data-search="${safeText(`${title} ${body}`)}"><span class="tag">Free · no email</span><h3>${safeText(title)}</h3><p>${safeText(body)}</p><button type="button" class="print-sheet" data-sheet="${index}">Open print-ready sheet ↗</button></article>`).join("");
    }
    function applySearch(query) {
      state.query=query.trim().toLowerCase();
      const countable= $$("[data-search]");
      let matches=0;
      countable.forEach(el=>{
        const content=(el.dataset.search || el.textContent || "").toLowerCase();
        const show=!state.query||content.includes(state.query);
        el.hidden=!show;
        if(show) matches++;
      });
      renderTools();
      const results=$("#global-search-results");
      if(results){
        const found=(window.FDT_PAGE_INDEX||[]).filter(item=>`${item.title} ${item.search}`.toLowerCase().includes(state.query)).slice(0,12);
        if(!state.query){
          results.innerHTML="";
          results.hidden=true;
        }else if(found.length){
          results.innerHTML=`<p class="search-results-heading">${found.length===12?"Top 12 results":"Matching pages"}</p>`+found.map(item=>`<a class="search-result" href="${safeText((window.FDT_BASE_PATH||"")+item.url)}"><strong>${safeText(item.title)}</strong><span>${safeText(item.description)}</span></a>`).join("");
          results.hidden=false;
        }else{
          results.innerHTML=`<div class="search-empty"><strong>No results for “${safeText(query.trim())}”</strong><span>Try “logo”, “fonts”, “SVG”, or “contrast”.</span></div>`;
          results.hidden=false;
        }
      }
      const text=state.query?`${matches} items on this page; ${((window.FDT_PAGE_INDEX||[]).filter(item=>`${item.title} ${item.search}`.toLowerCase().includes(state.query)).length)} results across all pages.`:"Search every page. Press / or Ctrl+K to jump to search.";
      status(text);
    }
    function renderCompare() {
      if(!$("#comparison-output")) return;
      const selected=tools.filter(tool=>state.compare.has(tool.name));
      if (!selected.length) { $("#comparison-output").innerHTML=""; return; }
      $("#comparison-output").innerHTML=`<h3>Tool comparison</h3><div class="table-wrap"><table><thead><tr><th scope="col">Detail</th>${selected.map(tool=>`<th scope="col">${safeText(tool.name)}</th>`).join("")}</tr></thead><tbody>${[["Category","category"],["Best for","best"],["Free-plan limits","limits"],["Pros","pros"],["Cons","cons"],["License","license"],["Verification status",null]].map(([label,key])=>`<tr><th scope="row">${label}</th>${selected.map(tool=>`<td>${key?safeText(tool[key]):VERIFIED_PLACEHOLDER}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    }
    function setTheme(theme) {
      document.documentElement.dataset.theme=theme;
      $("#theme-toggle").setAttribute("aria-label",`Switch to ${theme==="dark"?"light":"dark"} mode`);
      try { localStorage.setItem("fdt-theme",theme); } catch (error) { status("Theme changed for this visit, but browser storage is unavailable."); }
    }
    function syncSearch(value) {
      const header=$("#header-search"),hero=$("#hero-search");
      if(header) header.value=value;
      if(hero) hero.value=value;
      applySearch(value);
    }
    async function copyText(text, button) {
      try {
        if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
        else {
          const field=document.createElement("textarea");
          field.value=text; field.setAttribute("readonly",""); field.style.position="fixed"; field.style.opacity="0";
          document.body.append(field); field.select();
          const copied=document.execCommand("copy"); field.remove();
          if (!copied) throw new Error("Clipboard permission is unavailable.");
        }
        if (button) { const before=button.textContent; button.textContent="Copied!"; setTimeout(()=>button.textContent=before,1400); }
        status("Copied to clipboard.");
      } catch (error) {
        status(`Could not copy: ${error.message || "clipboard access was denied"}`);
      }
    }

    renderFeatured(); renderTools(); renderAI(); renderFormats(); renderLearn(); renderWorkflows(); renderPrompts(); renderResources(); renderAlternatives(); renderSheets(); renderAlternativeDetail();
    const year=$("#year"); if(year) year.textContent=new Date().getFullYear();
    try { const theme=localStorage.getItem("fdt-theme"); if(theme==="dark"||theme==="light") setTheme(theme); } catch (error) { status("Theme preference could not be loaded; using your system setting."); }
    listen("#header-search","input",event=>syncSearch(event.target.value));
    listen("#hero-search","input",event=>syncSearch(event.target.value));
    listen("#clear-search","click",()=>{syncSearch("");$("#hero-search")?.focus();});
    listen("#tool-filters","click",event=>{
      const button=event.target.closest("[data-category-filter]"); if(!button)return;
      state.category=button.dataset.categoryFilter; renderTools();
    });
    listen("#favorites-filter","click",()=>{state.favoritesOnly=!state.favoritesOnly;renderTools();});
    listen("#favorites-clear","click",()=>{
      if(!state.favorites.length)return;
      state.favorites=[];
      state.favoritesOnly=false;
      saveFavorites();
      renderFeatured();
      renderTools();
      status("All saved tools cleared.");
    });
    document.addEventListener("click",event=>{
      const favorite=event.target.closest("[data-favorite]");
      if(favorite){
        const name=favorite.dataset.favorite;
        state.favorites=state.favorites.includes(name)?state.favorites.filter(item=>item!==name):[...state.favorites,name];
        saveFavorites(); renderFeatured(); renderTools(); return;
      }
      const compare=event.target.closest("[data-compare]");
      if(compare){
        const name=compare.dataset.compare;
        if(state.compare.has(name)) state.compare.delete(name);
        else if(state.compare.size<3) state.compare.add(name);
        else { status("Compare up to 3 tools at a time. Remove one before adding another."); return; }
        renderTools(); renderCompare(); return;
      }
      const copy=event.target.closest(".copy-button");
      if(copy){
        const target=copy.dataset.copyTarget?document.getElementById(copy.dataset.copyTarget):null;
        copyText(copy.dataset.copy || target?.textContent || "",copy); return;
      }
      const print=event.target.closest(".print-sheet");
      if(print){ openSheet(Number(print.dataset.sheet)); return; }
    });
    listen("#compare-show","click",()=>{renderCompare();$("#comparison-output")?.scrollIntoView({behavior:"smooth",block:"start"});});
    listen("#compare-clear","click",()=>{state.compare.clear();renderTools();renderCompare();});
    listen("#theme-toggle","click",()=>{
      const current=document.documentElement.dataset.theme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
      setTheme(current==="dark"?"light":"dark");
    });
    document.addEventListener("keydown",event=>{
      const tag=(event.target.tagName||"").toLowerCase();
      const typing=["input","textarea","select"].includes(tag)||event.target.isContentEditable;
      if ((event.key==="/"&&!typing)||(event.key.toLowerCase()==="k"&&(event.ctrlKey||event.metaKey))) { event.preventDefault();$("#header-search")?.focus(); }
      if(event.key==="Escape"){
        if(document.activeElement===$("#header-search")||document.activeElement===$("#hero-search")){
          syncSearch("");
        }
      }
    });
    const navLinks=$$(".main-nav a");
    const currentPage=document.body.dataset.page;
    navLinks.forEach(link=>{if(link.dataset.pageLink===currentPage)link.setAttribute("aria-current","page");});

    function hexToRgb(hex){const value=hex.replace("#","");return {r:parseInt(value.slice(0,2),16),g:parseInt(value.slice(2,4),16),b:parseInt(value.slice(4,6),16)};}
    function rgbToHex({r,g,b}){return "#"+[r,g,b].map(value=>Math.round(value).toString(16).padStart(2,"0")).join("").toUpperCase();}
    function rgbToHsl({r,g,b}) {
      r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h=0,s=0;const l=(max+min)/2;
      if(max!==min){const d=max-min;s=l>.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;default:h=(r-g)/d+4;}h*=60;}
      return {h:Math.round(h),s:Math.round(s*100),l:Math.round(l*100)};
    }
    function hslToHex(h,s,l) {
      h=((h%360)+360)%360;s/=100;l/=100;
      const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;let rgb;
      if(h<60)rgb=[c,x,0];else if(h<120)rgb=[x,c,0];else if(h<180)rgb=[0,c,x];else if(h<240)rgb=[0,x,c];else if(h<300)rgb=[x,0,c];else rgb=[c,0,x];
      return rgbToHex({r:(rgb[0]+m)*255,g:(rgb[1]+m)*255,b:(rgb[2]+m)*255});
    }
    let generatedPalette=[];
    function generatePalette() {
      const color=$("#base-color").value;const {h,s,l}=rgbToHsl(hexToRgb(color));const mode=$("#palette-harmony").value;const purpose=$("#palette-purpose")?.value||"brand";
      const offsets=mode==="analogous"?[-28,-14,0,14,28]:mode==="triadic"?[0,120,240,30,210]:mode==="split"?[0,150,210,20,200]:[0,0,180,42,222];
      const purposeStyle={
        brand:{sat:0,lum:[0,18,-32,44,-18],label:"Use: primary, supporting, accent, light neutral, deep neutral"},
        editorial:{sat:-8,lum:[0,24,-26,48,-20],label:"Use: headline, secondary, accent, paper, ink"},
        interface:{sat:-15,lum:[0,28,-35,52,-24],label:"Use: action, hover, dark state, surface, text"},
        social:{sat:12,lum:[0,16,-20,42,-12],label:"Use: hero, highlight, contrast, background, type"},
        packaging:{sat:-3,lum:[0,20,-30,46,-16],label:"Use: label, detail, accent, substrate, ink"}
      }[purpose];
      const roles={
        brand:["Primary","Support","Accent","Soft neutral","Deep neutral"],
        editorial:["Headline","Secondary","Accent","Paper","Ink"],
        interface:["Action","Hover","Dark state","Surface","Text"],
        social:["Hero","Highlight","Contrast","Background","Type"],
        packaging:["Label","Detail","Accent","Substrate","Ink"]
      }[purpose];
      generatedPalette=offsets.map((offset,index)=>{
        if(index===0)return color.toUpperCase();
        const saturation=Math.max(12,Math.min(92,s+purposeStyle.sat+(index===2?8:0)));
        const lightness=Math.max(8,Math.min(88,l+purposeStyle.lum[index]));
        return hslToHex(h+offset,saturation,lightness);
      });
      $("#palette-output").innerHTML=generatedPalette.map((hex,index)=>`<button class="swatch" type="button" style="background:${hex}" data-color="${hex}" aria-label="Copy ${roles[index]} color ${hex}"><strong>${roles[index]}</strong><span>${hex}</span></button>`).join("");
      $("#palette-values").innerHTML=generatedPalette.map((hex,index)=>{
        const rgb=hexToRgb(hex),hsl=rgbToHsl(rgb);
        const values=[["HEX",hex],["RGB",`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`],["HSL",`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`]];
        return `<div class="color-value-row"><strong>${roles[index]} · ${hex}</strong>${values.map(([label,value])=>`<button class="button copy-button" type="button" data-copy="${safeText(value)}">${label}</button>`).join("")}</div>`;
      }).join("");
      $("#palette-note").textContent=purposeStyle.label+". The deep/ink color is a candidate for text—check contrast against light surfaces.";
    }
    listen("#base-color","input",generatePalette);listen("#palette-harmony","change",generatePalette);listen("#palette-purpose","change",generatePalette);if($("#palette-output"))generatePalette();
    listen("#palette-output","click",event=>{const swatch=event.target.closest("[data-color]");if(swatch)copyText(swatch.dataset.color,swatch);});
    listen("#copy-palette-css","click",()=>{
      if(!generatedPalette.length)return;
      const names=["primary","support","accent","surface","ink"];
      copyText(":root {\n"+generatedPalette.map((hex,index)=>`  --color-${names[index]}: ${hex};`).join("\n")+"\n}",$("#copy-palette-css"));
    });
    function luminance(hex) {
      const rgb=hexToRgb(hex);
      const channels=[rgb.r,rgb.g,rgb.b].map(value=>{const c=value/255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4;});
      return .2126*channels[0]+.7152*channels[1]+.0722*channels[2];
    }
    function updateContrast() {
      const fg=$("#contrast-fg").value,bg=$("#contrast-bg").value;
      const values=[luminance(fg),luminance(bg)].sort((a,b)=>b-a);const ratio=(values[0]+.05)/(values[1]+.05);
      $("#contrast-sample").style.color=fg;$("#contrast-sample").style.backgroundColor=bg;
      $("#contrast-result").textContent=`Contrast ratio: ${ratio.toFixed(2)}:1 · AA normal ${ratio>=4.5?"PASS":"FAIL"} · AA large ${ratio>=3?"PASS":"FAIL"} · AAA normal ${ratio>=7?"PASS":"FAIL"} · AAA large ${ratio>=4.5?"PASS":"FAIL"}`;
    }
    listen("#contrast-fg","input",updateContrast);listen("#contrast-bg","input",updateContrast);if($("#contrast-result"))updateContrast();
    const fontPairings={
      brand:[
        {heading:"Newsreader",body:"Public Sans",note:"Editorial character with a clear, practical voice"},
        {heading:"Public Sans",body:"Public Sans",note:"Consistent and understated for direct identities"}
      ],
      editorial:[
        {heading:"Newsreader",body:"Public Sans",note:"Readable long-form contrast with a human rhythm"},
        {heading:"Newsreader",body:"IBM Plex Mono",note:"Reference-like contrast for details and captions"}
      ],
      interface:[
        {heading:"Public Sans",body:"Public Sans",note:"Consistent and highly usable across dense screens"},
        {heading:"Newsreader",body:"Public Sans",note:"A calmer reading voice with restrained hierarchy"}
      ],
      social:[
        {heading:"Newsreader",body:"Public Sans",note:"Direct headlines that feel crafted rather than loud"},
        {heading:"Public Sans",body:"Public Sans",note:"Clean, repeatable text for campaign layouts"}
      ],
      poster:[
        {heading:"Newsreader",body:"IBM Plex Mono",note:"Cultured contrast with useful technical detail"},
        {heading:"Public Sans",body:"Newsreader",note:"Bold wayfinding with an expressive supporting voice"}
      ],
      luxury:[
        {heading:"Newsreader",body:"Public Sans",note:"Premium editorial character without a generic corporate feel"},
        {heading:"Georgia",body:"Public Sans",note:"Classic proportions with a familiar, credible voice"}
      ]
    };
    function applyFontPairing(heading,body) {
      $("#font-heading").value=heading;
      $("#font-body").value=body;
      updateFontPreview();
    }
    function updateFontRecommendations() {
      const purpose=$("#font-purpose")?.value||"brand";
      const pairings=fontPairings[purpose];
      $("#pairing-recommendations").innerHTML=pairings.map((pair,index)=>`<button type="button" class="pairing-option" data-heading="${safeText(pair.heading)}" data-body="${safeText(pair.body)}" aria-label="Use ${safeText(pair.heading)} with ${safeText(pair.body)}"><strong>${safeText(pair.heading)} + ${safeText(pair.body)}</strong><span>${safeText(pair.note)}</span></button>`).join("");
      $("#pairing-note").textContent=`Recommended for ${$("#font-purpose").selectedOptions[0].textContent}—choose a pairing or test your own fonts.`;
      if($("#pairing-recommendations"))applyFontPairing(pairings[0].heading,pairings[0].body);
    }
    function updateFontPreview() {
      const heading=$("#font-heading").value,body=$("#font-body").value,text=$("#font-copy").value||"Your type specimen.";
      $("#font-preview-heading").textContent=text;$("#font-preview-heading").style.fontFamily=`"${heading}", sans-serif`;
      $("#font-preview-body").style.fontFamily=`"${body}", sans-serif`;
      $("#font-preview-heading").style.fontWeight=heading==="Public Sans"?"700":"400";
      const families=[heading,body].map(name=>name.replaceAll(" ","+")).filter((name,index,array)=>array.indexOf(name)===index&&!["Georgia","Trebuchet+MS"].includes(name));
      let link=$("#dynamic-fonts");
      if(!link){link=document.createElement("link");link.id="dynamic-fonts";link.rel="stylesheet";document.head.append(link);}
      link.href=families.length?`https://fonts.googleapis.com/css2?${families.map(name=>name==="Newsreader"?`family=${name}:opsz,wght@6..72,400;6..72,700`:`family=${name}:wght@400;500;700;600`).join("&")}&display=swap`:"";
    }
    ["font-heading","font-body","font-copy"].forEach(id=>listen("#"+id,"input",updateFontPreview));
    listen("#font-purpose","change",updateFontRecommendations);
    listen("#pairing-recommendations","click",event=>{
      const option=event.target.closest("[data-heading]");
      if(option)applyFontPairing(option.dataset.heading,option.dataset.body);
    });
    if($("#font-preview-heading"))updateFontRecommendations();
    let convertedUrl="";
    listen("#convert-image","click",()=>{
      const file=$("#image-file").files[0];if(!file){$("#image-output").textContent="Choose an image file first.";return;}
      if(!file.type.startsWith("image/")){$("#image-output").textContent="That file is not a supported image.";return;}
      const reader=new FileReader();
      reader.onerror=()=>{$("#image-output").textContent="The selected image could not be read.";};
      reader.onload=()=>{
        const image=new Image();
        image.onerror=()=>{$("#image-output").textContent="This image could not be decoded by the browser.";};
        image.onload=()=>{
          const canvas=document.createElement("canvas");canvas.width=image.naturalWidth;canvas.height=image.naturalHeight;
          const context=canvas.getContext("2d");if(!context){$("#image-output").textContent="Canvas is unavailable in this browser.";return;}
          const type=$("#image-type").value;const quality=Math.max(.1,Math.min(1,Number($("#image-quality").value)||.85));
          context.fillStyle="#ffffff";if(type==="image/jpeg")context.fillRect(0,0,canvas.width,canvas.height);
          context.drawImage(image,0,0);
          canvas.toBlob(blob=>{
            if(!blob){$("#image-output").textContent="Conversion failed. Try another image or format.";return;}
            if(convertedUrl)URL.revokeObjectURL(convertedUrl);
            convertedUrl=URL.createObjectURL(blob);
            const ext=type==="image/jpeg"?"jpg":type==="image/png"?"png":"webp";
            $("#image-download").href=convertedUrl;$("#image-download").download=`converted-image.${ext}`;$("#image-download").hidden=false;
            $("#image-preview").src=convertedUrl;$("#image-preview").hidden=false;
            $("#image-output").textContent=`Converted ${image.naturalWidth}×${image.naturalHeight} image · ${(blob.size/1024).toFixed(1)} KB · ${ext.toUpperCase()}. Images remain in this browser.`;
          },type,quality);
        };
        image.src=reader.result;
      };
      reader.readAsDataURL(file);
    });
    function qrFieldMultiply(x,y) {
      let product=0;
      for(let bit=7;bit>=0;bit--){
        const high=(product>>>7)&1;
        product=((product<<1)&0xff)^(high?0x1d:0);
        product^=((y>>>bit)&1)*x;
      }
      return product;
    }
    function qrErrorCorrection(data,length) {
      let generator=[1],root=1;
      for(let i=0;i<length;i++){
        const next=Array(generator.length+1).fill(0);
        for(let j=0;j<generator.length;j++){next[j]^=generator[j];next[j+1]^=qrFieldMultiply(generator[j],root);}
        generator=next;root=qrFieldMultiply(root,2);
      }
      const remainder=data.concat(Array(length).fill(0));
      for(let i=0;i<data.length;i++){
        const factor=remainder[i];
        if(factor)for(let j=0;j<generator.length;j++)remainder[i+j]^=qrFieldMultiply(generator[j],factor);
      }
      return remainder.slice(data.length);
    }
    function qrPenalty(matrix) {
      const size=matrix.length;let score=0;
      for(let axis=0;axis<2;axis++){
        for(let line=0;line<size;line++){
          let runColor=null,runLength=0,values=[];
          for(let index=0;index<size;index++){
            const dark=axis?matrix[index][line]:matrix[line][index];values.push(dark);
            if(dark===runColor)runLength++;else{if(runLength>=5)score+=runLength-2;runColor=dark;runLength=1;}
          }
          if(runLength>=5)score+=runLength-2;
          for(let index=0;index<=size-7;index++){
            if(values[index]&&!values[index+1]&&values[index+2]&&values[index+3]&&values[index+4]&&!values[index+5]&&values[index+6]){
              const before=index>=4&&values.slice(index-4,index).every(value=>!value);
              const after=index+11<=size&&values.slice(index+7,index+11).every(value=>!value);
              if(before||after)score+=40;
            }
          }
        }
      }
      for(let y=0;y<size-1;y++)for(let x=0;x<size-1;x++){
        const value=matrix[y][x];
        if(value===matrix[y][x+1]&&value===matrix[y+1][x]&&value===matrix[y+1][x+1])score+=3;
      }
      const dark=matrix.flat().filter(Boolean).length,total=size*size;
      score+=Math.floor(Math.abs(dark*20-total*10)/total)*10;
      return score;
    }
    function makeQrMatrix(text) {
      // Byte-mode QR with low error correction supports short links and labels without a network dependency.
      const bytes=Array.from(new TextEncoder().encode(text));
      const dataLengths=[19,34,55,80,108],eccLengths=[7,10,15,20,26];
      const version=dataLengths.findIndex(length=>4+8+bytes.length*8<=length*8)+1;
      if(version<1)throw new RangeError("Keep the encoded text under 107 UTF-8 bytes.");
      const bits=[];
      const appendBits=(value,count)=>{for(let bit=count-1;bit>=0;bit--)bits.push((value>>>bit)&1);};
      appendBits(4,4);appendBits(bytes.length,8);bytes.forEach(byte=>appendBits(byte,8));
      const capacity=dataLengths[version-1]*8;
      for(let i=0;i<Math.min(4,capacity-bits.length);i++)bits.push(0);
      while(bits.length%8)bits.push(0);
      const data=[];
      for(let i=0;i<bits.length;i+=8)data.push(bits.slice(i,i+8).reduce((value,bit)=>(value<<1)|bit,0));
      for(let pad=0xec;data.length<dataLengths[version-1];pad^=0xfd)data.push(pad);
      const codewords=data.concat(qrErrorCorrection(data,eccLengths[version-1]));
      const size=17+4*version;
      const matrix=Array.from({length:size},()=>Array(size).fill(false));
      const functions=Array.from({length:size},()=>Array(size).fill(false));
      const setFunction=(x,y,dark)=>{if(x>=0&&y>=0&&x<size&&y<size){matrix[y][x]=Boolean(dark);functions[y][x]=true;}};
      const finder=(left,top)=>{
        for(let dy=-1;dy<=7;dy++)for(let dx=-1;dx<=7;dx++){
          const x=left+dx,y=top+dy;
          const dark=dx>=0&&dx<=6&&dy>=0&&dy<=6&&(dx===0||dx===6||dy===0||dy===6||(dx>=2&&dx<=4&&dy>=2&&dy<=4));
          setFunction(x,y,dark);
        }
      };
      finder(0,0);finder(size-7,0);finder(0,size-7);
      for(let index=8;index<size-8;index++){setFunction(6,index,index%2===0);setFunction(index,6,index%2===0);}
      const alignment=[[],[6,18],[6,22],[6,26],[6,30]][version-1];
      for(const y of alignment)for(const x of alignment){
        if(functions[y][x])continue;
        for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)setFunction(x+dx,y+dy,Math.max(Math.abs(dx),Math.abs(dy))!==1);
      }
      for(let i=0;i<=5;i++)setFunction(8,i,false);
      setFunction(8,7,false);setFunction(8,8,false);setFunction(7,8,false);
      for(let i=9;i<15;i++)setFunction(14-i,8,false);
      for(let i=0;i<8;i++)setFunction(size-1-i,8,false);
      for(let i=8;i<15;i++)setFunction(8,size-15+i,false);
      setFunction(8,size-8,true);
      let bitIndex=0,upward=true;
      for(let right=size-1;right>=1;right-=2){
        if(right===6)right=5;
        for(let step=0;step<size;step++){
          const y=upward?size-1-step:step;
          for(let offset=0;offset<2;offset++){
            const x=right-offset;
            if(!functions[y][x]){
              matrix[y][x]=bitIndex<codewords.length*8?Boolean((codewords[bitIndex>>>3]>>>(7-(bitIndex&7)))&1):false;
              bitIndex++;
            }
          }
        }
        upward=!upward;
      }
      const maskCondition=(mask,x,y)=>[
        (x+y)%2===0,y%2===0,x%3===0,(x+y)%3===0,
        (Math.floor(y/2)+Math.floor(x/3))%2===0,
        (x*y)%2+(x*y)%3===0,((x*y)%2+(x*y)%3)%2===0,
        ((x+y)%2+(x*y)%3)%2===0
      ][mask];
      const drawFormat=(target,mask)=>{
        const dataBits=(1<<3)|mask;let remainder=dataBits;
        for(let i=0;i<10;i++)remainder=(remainder<<1)^(((remainder>>>9)&1)*0x537);
        const format=((dataBits<<10)|remainder)^0x5412;
        const put=(x,y,index)=>{target[y][x]=Boolean((format>>>index)&1);};
        for(let i=0;i<=5;i++)put(8,i,i);
        put(8,7,6);put(8,8,7);put(7,8,8);
        for(let i=9;i<15;i++)put(14-i,8,i);
        for(let i=0;i<8;i++)put(size-1-i,8,i);
        for(let i=8;i<15;i++)put(8,size-15+i,i);
        target[size-8][8]=true;
      };
      let best=null,bestScore=Infinity;
      for(let mask=0;mask<8;mask++){
        const candidate=matrix.map(row=>row.slice());
        for(let y=0;y<size;y++)for(let x=0;x<size;x++)if(!functions[y][x]&&maskCondition(mask,x,y))candidate[y][x]=!candidate[y][x];
        drawFormat(candidate,mask);
        const score=qrPenalty(candidate);
        if(score<bestScore){bestScore=score;best=candidate;}
      }
      return best;
    }
    listen("#make-qr","click",()=>{
      const content=$("#qr-content").value.trim();
      if(!content){$("#qr-output").textContent="Enter a URL or text to encode.";return;}
      try{
        const matrix=makeQrMatrix(content),canvas=$("#qr-canvas"),moduleSize=8,quietZone=4;
        canvas.width=canvas.height=(matrix.length+quietZone*2)*moduleSize;
        const context=canvas.getContext("2d");
        if(!context)throw new Error("Canvas is unavailable in this browser.");
        context.fillStyle="#fff";context.fillRect(0,0,canvas.width,canvas.height);context.fillStyle="#000";
        matrix.forEach((row,y)=>row.forEach((dark,x)=>{if(dark)context.fillRect((x+quietZone)*moduleSize,(y+quietZone)*moduleSize,moduleSize,moduleSize);}));
        canvas.hidden=false;$("#qr-download").href=canvas.toDataURL("image/png");$("#qr-download").hidden=false;
        $("#qr-output").textContent="QR code generated locally. Scan-test it before printing or sharing.";
      }catch(error){$("#qr-output").textContent=`Could not make QR code: ${error.message}`;$("#qr-download").hidden=true;$("#qr-canvas").hidden=true;}
    });
    function calculateRatio() {
      const w=Number($("#ratio-width").value),h=Number($("#ratio-height").value);
      if(!Number.isFinite(w)||!Number.isFinite(h)||w<=0||h<=0){$("#ratio-output").textContent="Enter positive pixel dimensions.";return;}
      let a=Math.round(w),b=Math.round(h);const gcd=(x,y)=>y?gcd(y,x%y):x;const divisor=gcd(a,b);
      $("#ratio-output").textContent=`Ratio: ${a/divisor}:${b/divisor} · ${a} × ${b} px · ${w>h?"landscape":w<h?"portrait":"square"}.`;
    }
    listen("#calculate-ratio","click",calculateRatio);if($("#ratio-output"))calculateRatio();
    listen("#format-quiz","click",()=>$("#format-result").textContent=formatRecs[$("#format-use").value]);
    listen("#lab-format-button","click",()=>$("#lab-format-output").textContent=formatRecs[$("#lab-format-use").value==="motion"?"animation":$("#lab-format-use").value]);
    listen("#ai-quiz-button","click",()=>{
      const need=$("#ai-need").value,priority=$("#ai-priority").value;
      const pick=priority==="terms"?"Adobe Firefly":({photo:"Meta AI",vector:"Recraft",text:"Ideogram",commercial:"Adobe Firefly",illustration:"Leonardo AI",social:"Microsoft Designer / Copilot",general:"Google ImageFX / Gemini",writing:"ChatGPT",critique:"Claude"})[need];
      $("#ai-quiz-result").textContent=`Starting point: ${pick}. This is a discovery suggestion, not an endorsement. Verify availability, free limits, privacy, output ownership, and commercial terms before use.`;
    });
    const assistantHistory=[{role:"assistant",content:"Hi! Tell me what you’re making, and I’ll help you choose a next step, tool, color, or file type. You don’t need to know the technical terms."}];
    function appendAssistantInline(parent,text) {
      const pattern=/\*\*([^*]+)\*\*|`([^`]+)`|\*([^*\n]+)\*/g;
      let offset=0,match;
      while((match=pattern.exec(text))) {
        parent.append(document.createTextNode(text.slice(offset,match.index)));
        const tag=match[1]!==undefined?"strong":match[2]!==undefined?"code":"em";
        const formatted=document.createElement(tag);
        formatted.textContent=match[1]??match[2]??match[3];
        parent.append(formatted);
        offset=pattern.lastIndex;
      }
      parent.append(document.createTextNode(text.slice(offset)));
    }
    function renderAssistantText(container,text) {
      let list=null,listTag="";
      for(const line of String(text).replace(/\r/g,"").split("\n")) {
        const bullet=line.match(/^\s*[-*]\s+(.+)$/);
        const numbered=line.match(/^\s*\d+[.)]\s+(.+)$/);
        if(bullet||numbered) {
          const nextTag=bullet?"ul":"ol";
          if(!list||listTag!==nextTag) {
            list=document.createElement(nextTag);
            container.append(list);
            listTag=nextTag;
          }
          const item=document.createElement("li");
          appendAssistantInline(item,(bullet||numbered)[1]);
          list.append(item);
          continue;
        }
        list=null;
        listTag="";
        if(!line.trim())continue;
        const heading=line.match(/^#{1,3}\s+(.+)$/);
        const paragraph=document.createElement("p");
        appendAssistantInline(paragraph,heading?heading[1]:line);
        if(heading)paragraph.className="assistant-subheading";
        container.append(paragraph);
      }
    }
    function addAssistantMessage(role,text) {
      const message=document.createElement("div");
      message.className="assistant-message";
      message.dataset.role=role;
      if(role==="assistant")renderAssistantText(message,text);
      else message.textContent=text;
      $("#assistant-messages").append(message);
      $("#assistant-messages").scrollTop=$("#assistant-messages").scrollHeight;
    }
    function openAssistant() {
      $("#assistant-panel").hidden=false;
      $("#assistant-launcher").setAttribute("aria-expanded","true");
      $("#assistant-input").focus();
    }
    function closeAssistant() {
      $("#assistant-panel").hidden=true;
      $("#assistant-launcher").setAttribute("aria-expanded","false");
      $("#assistant-launcher").focus();
    }
    async function sendAssistantMessage(text) {
      const question=text.trim();
      if(!question||$("#assistant-send").disabled)return;
      $("#assistant-suggestions").hidden=true;
      $("#assistant-suggestions").replaceChildren();
      addAssistantMessage("user",question);
      assistantHistory.push({role:"user",content:question});
      const messages=assistantHistory.slice(-12);
      $("#assistant-input").value="";
      $("#assistant-send").disabled=true;
      $("#assistant-status").textContent="Thinking…";
      try {
        const endpoint=window.FDT_CHAT_ENDPOINT||`${window.FDT_BASE_PATH||""}api/chat`;
        const response=await fetch(endpoint,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({messages})
        });
        let result;
        try { result=await response.json(); }
        catch (error) { throw new Error("The assistant server returned an unreadable response. Make sure its server is running, then try again."); }
        if(!response.ok)throw new Error(result.error||`The assistant service returned an error (${response.status}).`);
        if(typeof result.reply!=="string"||!result.reply.trim())throw new Error("The assistant returned an empty reply. Please try again.");
        assistantHistory.push({role:"assistant",content:result.reply});
        addAssistantMessage("assistant",result.reply);
        const suggestions=$("#assistant-suggestions");
        const options=Array.isArray(result.options)
          ?result.options.filter(option=>typeof option==="string"&&option.trim()&&option.length<=80).slice(0,3)
          :[];
        for(const option of options) {
          const button=document.createElement("button");
          button.type="button";
          button.dataset.assistantPrompt=option;
          button.textContent=option;
          suggestions.append(button);
        }
        suggestions.hidden=options.length===0;
        $("#assistant-status").textContent="";
      } catch(error) {
        const detail=error instanceof TypeError
          ?"I couldn’t connect to the assistant service. Make sure the assistant server is running, then try again."
          :error.message;
        $("#assistant-status").textContent=detail;
      } finally {
        $("#assistant-send").disabled=false;
        $("#assistant-input").focus();
      }
    }
    listen("#assistant-launcher","click",openAssistant);
    listen("#assistant-close","click",closeAssistant);
    listen("#assistant-form","submit",event=>{event.preventDefault();sendAssistantMessage($("#assistant-input").value);});
    listen("#assistant-input","keydown",event=>{
      if(event.key==="Enter"&&!event.shiftKey){event.preventDefault();$("#assistant-form").requestSubmit();}
    });
    document.addEventListener("click",event=>{
      const suggestion=event.target.closest("[data-assistant-prompt]");
      if(suggestion)sendAssistantMessage(suggestion.dataset.assistantPrompt);
    });
    document.addEventListener("keydown",event=>{
      if(event.key==="Escape"&&!$("#assistant-panel").hidden)closeAssistant();
    });
    function openSheet(index) {
      const sheet=sheets[index];if(!sheet){status("That cheat sheet is unavailable.");return;}
      const win=window.open("","_blank");
      if(!win){status("Popup was blocked. Allow this page to open the print-ready sheet, then try again.");return;}
      const content=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${safeText(sheet[0])} · Free Design Toolkit</title><style>body{max-width:760px;margin:3rem auto;padding:0 1.5rem;color:#171714;font:18px/1.6 Arial,sans-serif}h1{font-size:2.4rem}button{padding:.7rem 1rem;font:inherit;font-weight:bold}@media print{button{display:none}body{margin:0 auto}}</style><h1>${safeText(sheet[0])}</h1><p>${safeText(sheet[1])}</p><p>Free Design Toolkit · Verify product and platform details before use.</p><button onclick="window.print()">Print / Save as PDF</button></html>`;
      win.document.open();win.document.write(content);win.document.close();
    }
    listen("#newsletter-form","submit",event=>{event.preventDefault();$("#newsletter-status").textContent="Demo only: no signup was sent or saved. The email field can be left blank.";});
    listen("#suggest-form","submit",event=>{event.preventDefault();$("#suggest-status").textContent="Demo only: your suggestion was not sent or stored.";});
    let hasVoted=false,votes=0;
    try { hasVoted=localStorage.getItem("fdt-upvoted")==="yes";votes=Number(localStorage.getItem("fdt-votes")||0);if(!Number.isFinite(votes)||votes<0)votes=0; } catch (error) { status("Community demo preference could not be loaded."); }
    function renderVote(){ $("#vote-count").textContent=`${votes} local demo upvote${votes===1?"":"s"}`;$("#upvote").setAttribute("aria-pressed",String(hasVoted));$("#upvote").textContent=hasVoted?"✓ Upvoted on this device":"▲ Upvote locally"; }
    if($("#upvote"))renderVote();
    listen("#upvote","click",()=>{
      hasVoted=!hasVoted;votes=Math.max(0,votes+(hasVoted?1:-1));
      try { localStorage.setItem("fdt-upvoted",hasVoted?"yes":"no");localStorage.setItem("fdt-votes",String(votes)); }
      catch (error) { status("Vote updated for this visit, but browser storage is unavailable."); }
      renderVote();
    });