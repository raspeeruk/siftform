export type EmbedPlatform = {
  slug: string;
  name: string;
  category: "ecommerce" | "cms" | "site-builder" | "framework" | "vanilla";
  headline: string;
  description: string;
  intro: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  estimatedTime: string;
  steps: { title: string; description: string }[];
  codeSnippet: { language: string; code: string };
  alternativeMethods?: { title: string; description: string; code?: string }[];
  tips: string[];
  faqs: { question: string; answer: string }[];
  troubleshooting: { problem: string; solution: string }[];
  relatedPlatforms: string[];
};

const BASE_SNIPPET = `<script
  src="https://siftforms.com/widget/v1.js"
  data-schema-id="YOUR_FORM_ID"
  data-api-key="YOUR_PUBLIC_KEY"
  async
></script>`;

export const embedPlatforms: EmbedPlatform[] = [
  // ---------------------------------------------------------------------------
  // 1. Shopify
  // ---------------------------------------------------------------------------
  {
    slug: "shopify",
    name: "Shopify",
    category: "ecommerce",
    headline: "Add an AI form to your Shopify store in under 2 minutes",
    description:
      "Embed the Sift widget on any Shopify page using the Custom Liquid section. Works on product pages, contact pages, landing pages, and theme-wide.",
    intro:
      "Shopify's theme editor makes embedding the Sift widget straightforward. You can add it to any page using a Custom Liquid section, or theme-wide via the theme.liquid file. Once installed, customers can describe what they need in plain language instead of filling out rigid forms.",
    difficulty: "Easy",
    estimatedTime: "2 minutes",
    steps: [
      {
        title: "Open the Shopify theme editor",
        description:
          "From your Shopify admin, go to Online Store → Themes, find your active theme, and click Customize to open the editor.",
      },
      {
        title: "Pick the page and add a Custom Liquid section",
        description:
          "Use the page selector to navigate to where you want the widget. Click Add section, search for Custom Liquid, and add it to the layout.",
      },
      {
        title: "Paste the embed snippet and save",
        description:
          "Paste the Sift script into the Custom Liquid box, replace YOUR_FORM_ID and YOUR_PUBLIC_KEY with your dashboard values, then click Save. The widget appears immediately.",
      },
    ],
    codeSnippet: {
      language: "liquid",
      code: `{% comment %} Sift AI Form Widget {% endcomment %}
${BASE_SNIPPET}`,
    },
    alternativeMethods: [
      {
        title: "Theme-wide install (theme.liquid)",
        description:
          "For a widget on every page (e.g. a global support form), edit theme.liquid in the code editor and paste the snippet just before the closing </body> tag.",
      },
      {
        title: "Product-page install",
        description:
          "Edit the product template and add a Custom Liquid block to make the widget appear on every product page — useful for collecting custom-order specs or quote requests.",
      },
    ],
    tips: [
      "Place the widget above the fold on contact and quote-request pages for highest conversion",
      "Use Sift's webhook integration to push extracted leads directly into Shopify Customer notes",
      "The widget uses Shadow DOM, so your theme styles will not interfere with it",
      "Bundle size is 8KB gzipped — no impact on Shopify's Lighthouse score",
    ],
    faqs: [
      {
        question: "Will Sift slow down my Shopify store?",
        answer:
          "No. The widget is loaded asynchronously and weighs just 8KB gzipped. It will not block page rendering or affect your Lighthouse performance score.",
      },
      {
        question: "Does Sift work with Shopify 2.0 themes?",
        answer:
          "Yes. Sift works with all Shopify themes, including Online Store 2.0 themes like Dawn, Studio, Sense, and Crave. The Custom Liquid section is available in every modern Shopify theme.",
      },
      {
        question: "Can I use Sift on the Shopify checkout page?",
        answer:
          "Custom scripts on checkout require Shopify Plus and the Checkout Extensibility framework. For most use cases, embedding on contact, product, or landing pages covers the need.",
      },
      {
        question: "How do I push extracted data into Shopify orders or notes?",
        answer:
          "Use Sift's webhook integration. Configure a webhook URL in your Sift dashboard pointing to your Shopify app or Zapier zap that creates customer notes, draft orders, or tags.",
      },
      {
        question: "Can I style the widget to match my Shopify theme?",
        answer:
          "Yes. The widget configurator in your Sift dashboard lets you set the primary colour, background, border radius, and copy to match your Shopify theme exactly.",
      },
    ],
    troubleshooting: [
      {
        problem: "Widget does not appear after saving",
        solution:
          "Check that you replaced both YOUR_FORM_ID and YOUR_PUBLIC_KEY with the actual values from your Sift dashboard. Refresh the storefront with a hard reload (Cmd+Shift+R or Ctrl+Shift+F5).",
      },
      {
        problem: "Widget appears but cannot submit",
        solution:
          "This usually means the form is inactive or the API key is incorrect. Verify in your Sift dashboard that the form is Active and the public API key starts with iq_pub_.",
      },
    ],
    relatedPlatforms: ["wordpress", "wix", "squarespace"],
  },

  // ---------------------------------------------------------------------------
  // 2. WordPress
  // ---------------------------------------------------------------------------
  {
    slug: "wordpress",
    name: "WordPress",
    category: "cms",
    headline: "Embed an AI form on any WordPress page in 2 minutes",
    description:
      "Add the Sift widget to WordPress using the Custom HTML block, a header/footer plugin, or directly in your theme files. Works with classic editor, Gutenberg, and Elementor.",
    intro:
      "WordPress powers over 40% of the web, and Sift fits into any WordPress workflow. Whether you use the block editor, classic editor, or a page builder like Elementor, embedding the Sift widget is a one-step process.",
    difficulty: "Easy",
    estimatedTime: "2 minutes",
    steps: [
      {
        title: "Open the page or post in the editor",
        description:
          "From your WordPress admin, edit the page or post where you want the widget to appear. Both Gutenberg and the classic editor work.",
      },
      {
        title: "Add a Custom HTML block",
        description:
          "In Gutenberg, click the + button and search for Custom HTML. In the classic editor, switch to the Text tab. In Elementor, drag in an HTML widget.",
      },
      {
        title: "Paste the snippet and publish",
        description:
          "Paste the Sift embed code into the HTML block, replace the placeholders with your dashboard values, then publish or update the page.",
      },
    ],
    codeSnippet: {
      language: "html",
      code: BASE_SNIPPET,
    },
    alternativeMethods: [
      {
        title: "Site-wide via header/footer plugin",
        description:
          'Install a plugin like "Insert Headers and Footers" or "WPCode" and paste the snippet into the footer section. The widget will be available on every page (you control where it renders by adding it as a shortcode or block).',
      },
      {
        title: "Direct theme edit (footer.php)",
        description:
          "If you are comfortable editing theme files, paste the snippet into your child theme's footer.php just before the closing </body> tag. Always use a child theme to avoid losing changes on theme updates.",
      },
    ],
    tips: [
      "Use WordPress page builders like Elementor or Beaver Builder by dragging in an HTML widget",
      "For multi-language sites with WPML, embed the same widget on translated pages — Sift handles input in any language",
      "Use Sift webhooks to push extracted form data into WP Users, custom post types, or WooCommerce orders",
      "Combine with Contact Form 7 by replacing the contact form entirely — Sift's free-text approach has higher completion rates",
    ],
    faqs: [
      {
        question: "Do I need a plugin to embed Sift on WordPress?",
        answer:
          "No plugin is required. The Custom HTML block in Gutenberg (or the Text tab in classic editor) is all you need. Plugins are only useful if you want site-wide placement or to insert the script into headers/footers.",
      },
      {
        question: "Does Sift work with Elementor and other page builders?",
        answer:
          "Yes. Every major WordPress page builder (Elementor, Divi, Beaver Builder, Bricks, Oxygen) has an HTML widget that accepts the Sift embed code.",
      },
      {
        question: "Will Sift conflict with my WordPress theme styles?",
        answer:
          "No. The widget renders inside a Shadow DOM, completely isolated from your theme's CSS. It will look the same on any WordPress theme.",
      },
      {
        question: "Can I push extracted data into WooCommerce or a custom post type?",
        answer:
          "Yes. Use Sift's webhook integration to send structured data to a WordPress REST API endpoint or to Zapier, which can create WooCommerce orders, customers, or custom post entries.",
      },
      {
        question: "Is Sift GDPR compliant for WordPress sites in the EU?",
        answer:
          "Yes. Sift processes form submissions ephemerally, does not use submissions for model training, and supports data residency requirements. Add a privacy notice to your form page describing how submissions are processed.",
      },
    ],
    troubleshooting: [
      {
        problem: "Widget code shows as plain text on the published page",
        solution:
          "You probably pasted into the Visual editor instead of the Text/HTML editor. In Gutenberg, use a Custom HTML block. In classic editor, switch to the Text tab before pasting.",
      },
      {
        problem: "Widget loads in preview but not on live site (cache)",
        solution:
          "Clear your WordPress caching plugin (WP Rocket, W3 Total Cache, etc.) and any CDN cache (Cloudflare, BunnyCDN). The widget script is fetched from siftforms.com so the script itself is not cached by your plugin.",
      },
    ],
    relatedPlatforms: ["shopify", "wix", "squarespace"],
  },

  // ---------------------------------------------------------------------------
  // 3. Webflow
  // ---------------------------------------------------------------------------
  {
    slug: "webflow",
    name: "Webflow",
    category: "site-builder",
    headline: "Embed Sift on Webflow with the Embed component",
    description:
      "Add the Sift widget to any Webflow page using the built-in Embed component, or globally via Project Settings → Custom Code.",
    intro:
      "Webflow's Embed component makes adding the Sift widget trivial. Drop it onto any page, paste the script, and publish. For site-wide installs, use the Custom Code section in your Project Settings to inject the script into every page automatically.",
    difficulty: "Easy",
    estimatedTime: "2 minutes",
    steps: [
      {
        title: "Open the Webflow Designer",
        description:
          "Log into Webflow and open the project where you want the widget. Navigate to the page that should host it.",
      },
      {
        title: "Drag in an Embed component",
        description:
          "From the Add Elements panel (the + icon), find the Embed component under Components and drag it into the layout where you want the widget.",
      },
      {
        title: "Paste the embed code and publish",
        description:
          "In the Embed Code Editor that pops up, paste the Sift script, replace the placeholders, click Save & Close, and publish your site.",
      },
    ],
    codeSnippet: {
      language: "html",
      code: BASE_SNIPPET,
    },
    alternativeMethods: [
      {
        title: "Site-wide install (Project Settings)",
        description:
          "Go to Project Settings → Custom Code → Footer Code and paste the Sift snippet there. The widget script will load on every page. Then add empty Embed components on the pages where you want the widget to appear.",
      },
    ],
    tips: [
      "Wrap the Embed component in a Webflow div with consistent padding for visual harmony with your design system",
      "Use Webflow's class naming to position the widget container, but never override its inner styles — Shadow DOM keeps it isolated",
      "Test in Webflow's preview mode before publishing to staging",
      "For client projects, document the Sift form ID alongside other site credentials",
    ],
    faqs: [
      {
        question: "Does Sift work with Webflow's CMS Collections?",
        answer:
          "Yes. You can embed the widget on any Collection Item template page. Use a different form ID per collection if you need to track submissions separately.",
      },
      {
        question: "Will Sift affect my Webflow page's SEO score?",
        answer:
          "No. The widget loads asynchronously and weighs only 8KB gzipped. It does not block rendering and has zero impact on Lighthouse SEO scores.",
      },
      {
        question: "Can I use Webflow Logic to process Sift submissions?",
        answer:
          "Sift supports webhooks, so you can pipe submissions into Webflow Logic, Zapier, Make, or any external workflow tool that accepts webhook input.",
      },
      {
        question: "What is the difference between Embed and Custom Code in Webflow?",
        answer:
          "The Embed component places code inline at a specific position on a page. Custom Code in Project Settings injects code into the head or footer of every page on the site. Use Embed for page-specific placement, Custom Code for site-wide scripts.",
      },
      {
        question: "Does the Sift widget work in Webflow's preview mode?",
        answer:
          "Yes. The widget loads in both the published site and Webflow's preview view. If it does not appear in preview, hard refresh (Cmd+Shift+R) and check the browser console for errors.",
      },
    ],
    troubleshooting: [
      {
        problem: "Embed component shows code instead of the widget",
        solution:
          "Make sure you pasted the script into the Embed Code Editor (not a regular Text Block). Click the embed component to open the editor, paste the code, and save.",
      },
      {
        problem: "Widget shows in Designer but not on published site",
        solution:
          "Webflow only loads embed scripts on published or preview environments, not in the Designer canvas. Publish to a staging or live URL to verify.",
      },
    ],
    relatedPlatforms: ["framer", "squarespace", "shopify"],
  },

  // ---------------------------------------------------------------------------
  // 4. Squarespace
  // ---------------------------------------------------------------------------
  {
    slug: "squarespace",
    name: "Squarespace",
    category: "site-builder",
    headline: "Add an AI form to Squarespace using a Code Block",
    description:
      "Embed the Sift widget on Squarespace pages using the built-in Code Block. Works on Squarespace 7.0 and 7.1, on any plan that supports Code Blocks.",
    intro:
      "Squarespace's Code Block lets you embed any HTML or JavaScript snippet on your page. The Sift widget drops in cleanly, renders inline, and uses Shadow DOM to avoid clashing with your Squarespace template styles.",
    difficulty: "Easy",
    estimatedTime: "3 minutes",
    steps: [
      {
        title: "Edit the page where you want the widget",
        description:
          "From your Squarespace dashboard, navigate to the page you want to update and click Edit.",
      },
      {
        title: "Add a Code Block",
        description:
          "Click an Insert Point (the line that appears between sections), select Code from the menu, and confirm. The Code Block opens with a default snippet.",
      },
      {
        title: "Paste the Sift script and save",
        description:
          "Replace the default code with the Sift snippet, ensure the language dropdown is set to HTML, toggle Display Source OFF, click Apply, and save the page.",
      },
    ],
    codeSnippet: {
      language: "html",
      code: BASE_SNIPPET,
    },
    alternativeMethods: [
      {
        title: "Site-wide via Code Injection",
        description:
          "Go to Settings → Advanced → Code Injection and paste the snippet into the Footer field. The widget script loads on every page. Then place an empty container div where you want the widget to render.",
      },
    ],
    tips: [
      "Code Blocks require a Business plan or higher on Squarespace 7.0 — verify your plan supports custom code",
      "Always toggle Display Source OFF or your visitors will see the raw HTML",
      "Squarespace lazy-loads images, but the Sift widget loads independently — no conflict",
      "If you use Squarespace Forms elsewhere, Sift can replace them entirely with a smarter, lower-friction alternative",
    ],
    faqs: [
      {
        question: "Do I need a Business plan on Squarespace to embed Sift?",
        answer:
          "Yes. Squarespace requires a Business, Commerce Basic, or Commerce Advanced plan to use Code Blocks and Code Injection. Personal plans do not support custom code.",
      },
      {
        question: "Does Sift work on Squarespace 7.0 and 7.1?",
        answer:
          "Yes. Both Squarespace 7.0 and 7.1 support Code Blocks and Code Injection in the same way. The Sift widget works identically on both.",
      },
      {
        question: "Can I use Sift on a Squarespace Member Area page?",
        answer:
          "Yes. Code Blocks work inside member-area pages. The widget will only render for logged-in members if the page itself is restricted.",
      },
      {
        question: "How does Sift compare to Squarespace Forms?",
        answer:
          "Squarespace Forms collect data into rigid fields. Sift lets visitors describe their request in plain language and the AI extracts structured data — much higher completion rates and richer context per submission.",
      },
      {
        question: "Will the Sift widget break my Squarespace site styles?",
        answer:
          "No. The widget uses Shadow DOM, completely isolating its styles from your Squarespace template. There is no risk of CSS conflicts.",
      },
    ],
    troubleshooting: [
      {
        problem: "Widget renders as raw HTML text",
        solution:
          "You forgot to toggle Display Source OFF in the Code Block editor. Edit the block, click the eye icon to disable Display Source, and save.",
      },
      {
        problem: "Code Block option does not appear",
        solution:
          "Code Blocks require a Business plan or higher. Upgrade your Squarespace plan, or use a third-party embed service if you are on Personal.",
      },
    ],
    relatedPlatforms: ["webflow", "wix", "wordpress"],
  },

  // ---------------------------------------------------------------------------
  // 5. Wix
  // ---------------------------------------------------------------------------
  {
    slug: "wix",
    name: "Wix",
    category: "site-builder",
    headline: "Embed an AI form on your Wix site with Custom Element",
    description:
      "Add the Sift widget to Wix using the Custom Element or HTML iFrame embed. Both options take less than 3 minutes to set up.",
    intro:
      "Wix offers two paths for embedding third-party scripts: Custom Element (the recommended method, native to Wix Studio and Editor X) and the HTML iFrame embed (works on classic Wix). Sift works with both.",
    difficulty: "Easy",
    estimatedTime: "3 minutes",
    steps: [
      {
        title: "Open the Wix Editor",
        description:
          "Log into Wix and open the site editor for the project where you want the widget.",
      },
      {
        title: "Add an Embed component",
        description:
          'Click the Add Elements panel (+ icon), choose Embed Code, and select either Embed HTML or Custom Element. For most users, Embed HTML is the simplest.',
      },
      {
        title: "Paste the snippet and publish",
        description:
          "In the embed dialog, paste the Sift script, click Update, then publish the site. The widget appears at the position you placed the embed component.",
      },
    ],
    codeSnippet: {
      language: "html",
      code: `<!-- Wix HTML iFrame embed -->
${BASE_SNIPPET}`,
    },
    alternativeMethods: [
      {
        title: "Custom Element (recommended for Wix Studio)",
        description:
          'In Wix Studio, use Add Elements → Embed → Custom Element. Set the tag name to "div", point the source to siftforms.com/widget/v1.js, and configure data attributes via the panel.',
      },
      {
        title: "Velo / Corvid scripting",
        description:
          "If you use Wix Velo, you can dynamically inject the Sift script via $w.onReady() and call the widget API programmatically.",
      },
    ],
    tips: [
      "The HTML iFrame method wraps the widget in an iframe — fine for inline use, but resize handles may be needed",
      "Custom Element is preferred in Wix Studio for cleaner integration",
      "Wix has strict CSP rules — Sift's script is whitelisted, but custom code from other sources may not be",
      "For best mobile experience, set the embed component width to 100% in the Wix editor",
    ],
    faqs: [
      {
        question: "Does Sift work on the free Wix plan?",
        answer:
          "Custom embed components are available on most Wix plans, including the free plan with limitations. Verify your plan supports HTML Embed before installing.",
      },
      {
        question: "What is the difference between HTML Embed and Custom Element on Wix?",
        answer:
          "HTML Embed wraps your code in an iframe — easier to set up but with some sizing constraints. Custom Element registers the script as a native web component on the page — better integration but slightly more setup.",
      },
      {
        question: "Will the Sift widget work in Wix Studio?",
        answer:
          "Yes. Wix Studio supports both Custom Elements and HTML embeds. We recommend Custom Element for Wix Studio for the best user experience.",
      },
      {
        question: "Can I use Sift with Wix Velo to process submissions in code?",
        answer:
          "Yes. Velo developers can listen for postMessage events from the Sift widget and write Velo backend code to handle submissions, or set up a webhook for cleaner separation.",
      },
      {
        question: "Does the widget look correct on Wix mobile sites?",
        answer:
          "Yes. The widget is fully responsive and renders correctly on mobile. Resize the embed component to 100% width for the best mobile experience.",
      },
    ],
    troubleshooting: [
      {
        problem: "Widget shows as a small iframe with scrollbars",
        solution:
          "Set the embed component height to 'auto' if available, or manually drag the height to fit the widget. The widget content adjusts to its container.",
      },
      {
        problem: "Script does not run inside HTML Embed",
        solution:
          'Wix wraps HTML embeds in an iframe sandbox. The Sift script is whitelisted and works correctly. If it does not load, try the Custom Element approach instead.',
      },
    ],
    relatedPlatforms: ["squarespace", "webflow", "shopify"],
  },

  // ---------------------------------------------------------------------------
  // 6. React / Next.js
  // ---------------------------------------------------------------------------
  {
    slug: "react",
    name: "React / Next.js",
    category: "framework",
    headline: "Embed Sift in your React or Next.js app with a useEffect hook",
    description:
      "Drop the Sift widget into any React, Next.js, or Vite app using a simple useEffect script-loader pattern. Works with React 17, 18, 19, and Next.js App Router or Pages Router.",
    intro:
      "React and Next.js apps need a tiny bit more code than CMS embeds because the script must be injected into the DOM after the component mounts. The pattern is a 20-line client component that uses useEffect to inject the Sift script and clean it up on unmount.",
    difficulty: "Easy",
    estimatedTime: "5 minutes",
    steps: [
      {
        title: "Create a SiftWidget client component",
        description:
          'In your project, create a new file like components/SiftWidget.tsx. In Next.js App Router, mark it with "use client" at the top.',
      },
      {
        title: "Add the useEffect script loader",
        description:
          "Use useEffect to create a script element on mount, set the data attributes, append it to a container ref, and clean up on unmount.",
      },
      {
        title: "Import and use the component anywhere",
        description:
          'Pass your form ID and API key as props: <SiftWidget formId="..." apiKey="..." />. The widget renders inline at that position.',
      },
    ],
    codeSnippet: {
      language: "tsx",
      code: `"use client";
import { useEffect, useRef } from "react";

export function SiftWidget({
  formId,
  apiKey,
}: {
  formId: string;
  apiKey: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const script = document.createElement("script");
    script.src = "https://siftforms.com/widget/v1.js";
    script.setAttribute("data-schema-id", formId);
    script.setAttribute("data-api-key", apiKey);
    script.async = true;
    containerRef.current.appendChild(script);

    return () => {
      script.remove();
    };
  }, [formId, apiKey]);

  return <div ref={containerRef} />;
}`,
    },
    alternativeMethods: [
      {
        title: "Next.js Script component",
        description:
          'In Next.js you can also use the built-in Script component with strategy="afterInteractive". Note that data attributes work but the widget renders globally, not inline at the position where Script is mounted.',
        code: `import Script from "next/script";

export function SiftWidget() {
  return (
    <Script
      src="https://siftforms.com/widget/v1.js"
      data-schema-id="YOUR_FORM_ID"
      data-api-key="YOUR_PUBLIC_KEY"
      strategy="afterInteractive"
    />
  );
}`,
      },
      {
        title: "Vite / Create React App",
        description:
          "The same useEffect pattern works in Vite, Create React App, and any React-based framework. No build configuration changes required.",
      },
    ],
    tips: [
      "Always mark the component as a client component in Next.js App Router (use client directive)",
      "Use environment variables for the API key: process.env.NEXT_PUBLIC_SIFT_API_KEY",
      "The cleanup function in useEffect prevents duplicate widgets if the component remounts",
      "Shadow DOM keeps the widget isolated from your Tailwind/CSS-in-JS styles",
      "For SSR, the widget only mounts on the client — useEffect guarantees this",
    ],
    faqs: [
      {
        question: "Does Sift work with Next.js Server Components?",
        answer:
          'No, the Sift widget requires client-side execution. Wrap the component in a client component with "use client" at the top. The parent page can still be a server component.',
      },
      {
        question: "Will Sift work with React 19?",
        answer:
          "Yes. The useEffect pattern is compatible with React 17, 18, and 19. Sift does not depend on React internals, so it works with any version.",
      },
      {
        question: "Can I use Sift with Tailwind, CSS Modules, or styled-components?",
        answer:
          "Yes. The widget renders inside a Shadow DOM, completely isolated from your application's styles. There are zero conflicts.",
      },
      {
        question: "How do I handle multiple widgets on the same page?",
        answer:
          "Each instance of the SiftWidget component creates its own script tag and renders an independent widget. Pass different formId props to render different forms side by side.",
      },
      {
        question: "How do I respond to widget submissions in my React app?",
        answer:
          "Use Sift's webhook integration to push submissions to your backend, or listen for postMessage events from the widget if you need client-side handling.",
      },
    ],
    troubleshooting: [
      {
        problem: "Widget appears twice in development",
        solution:
          "React 18 strict mode runs effects twice in development. The cleanup function in our example handles this — make sure you are returning script.remove() from useEffect.",
      },
      {
        problem: 'Hydration error: "did not match"',
        solution:
          'The widget injects DOM nodes after mount, which can confuse Next.js SSR. Make sure your SiftWidget component is marked "use client" and that you are not rendering it from a server component without that boundary.',
      },
    ],
    relatedPlatforms: ["html", "framer"],
  },

  // ---------------------------------------------------------------------------
  // 7. Plain HTML
  // ---------------------------------------------------------------------------
  {
    slug: "html",
    name: "Plain HTML",
    category: "vanilla",
    headline: "Embed Sift on any HTML page with a single script tag",
    description:
      "The simplest install: paste a single script tag into any HTML page and the Sift widget renders inline. No build tools, no frameworks, no dependencies.",
    intro:
      "If you have a static HTML site, a hand-coded landing page, or any page where you can edit the markup directly, this is the fastest way to add Sift. One script tag, two data attributes, done.",
    difficulty: "Easy",
    estimatedTime: "1 minute",
    steps: [
      {
        title: "Open your HTML file in a code editor",
        description:
          "Use any editor — VS Code, Sublime, Notepad. Locate the place in the markup where you want the widget to appear (usually inside a section or container).",
      },
      {
        title: "Paste the Sift script tag",
        description:
          "Copy the embed snippet and paste it where you want the widget to render. The widget appears inline immediately after the script tag.",
      },
      {
        title: "Replace placeholders and save",
        description:
          "Replace YOUR_FORM_ID and YOUR_PUBLIC_KEY with the values from your Sift dashboard. Save the file and reload your page in the browser.",
      },
    ],
    codeSnippet: {
      language: "html",
      code: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Contact Us</h1>
  <p>Tell us about your project:</p>

${BASE_SNIPPET}

</body>
</html>`,
    },
    tips: [
      "The script tag can go anywhere in the body — it renders inline at its position",
      "No CSS conflicts: the widget uses Shadow DOM",
      "Works on file:// URLs for local testing — no server required",
      "Place inside a max-width container for better readability on wide screens",
    ],
    faqs: [
      {
        question: "Do I need a build step or npm install?",
        answer:
          "No. The script tag loads everything from siftforms.com directly. No npm, no webpack, no build pipeline. Just save your HTML file and refresh.",
      },
      {
        question: "Can I use Sift on a static site (Jekyll, Hugo, Eleventy)?",
        answer:
          "Yes. Any static site generator that produces HTML output can embed Sift. Just paste the script tag into your template or page source.",
      },
      {
        question: "Does the widget work without JavaScript enabled?",
        answer:
          "No. The Sift widget is JavaScript-based and requires JS to be enabled in the browser. If you need a no-JS fallback, render a standard HTML form alongside the widget.",
      },
      {
        question: "Can I host the widget script on my own server?",
        answer:
          "Self-hosting is not currently supported. The widget loads from siftforms.com to ensure security updates and bug fixes are delivered automatically.",
      },
      {
        question: "Will the widget work inside a CSP-protected page?",
        answer:
          "If your page has a Content Security Policy, you need to allowlist siftforms.com under script-src and connect-src. Add: script-src 'self' https://siftforms.com; connect-src 'self' https://siftforms.com;",
      },
    ],
    troubleshooting: [
      {
        problem: "Widget does not appear",
        solution:
          "Open the browser console (F12) and check for errors. The most common issue is a missing or invalid form ID / API key. Double-check the values from your Sift dashboard.",
      },
      {
        problem: "Page shows the script tag as text",
        solution:
          "You probably have the file as .txt instead of .html. Save with the .html extension and open it in a browser, not a text editor.",
      },
    ],
    relatedPlatforms: ["react", "wordpress"],
  },

  // ---------------------------------------------------------------------------
  // 8. Framer
  // ---------------------------------------------------------------------------
  {
    slug: "framer",
    name: "Framer",
    category: "site-builder",
    headline: "Embed Sift on Framer with the Embed component",
    description:
      "Add the Sift widget to any Framer site using the built-in Embed component. Works on both free and Pro plans.",
    intro:
      "Framer's Embed component is the cleanest way to drop in third-party scripts. Sift fits naturally into Framer's design-driven workflow, letting you collect rich, AI-extracted form data while maintaining your visual design system.",
    difficulty: "Easy",
    estimatedTime: "2 minutes",
    steps: [
      {
        title: "Open the Framer canvas",
        description:
          "Log into Framer and open the project you want to update. Navigate to the page where the widget should appear.",
      },
      {
        title: "Insert an Embed layer",
        description:
          "From the Insert menu (or press I), search for Embed. Drag the Embed component into your layout where you want the widget.",
      },
      {
        title: "Paste the script and publish",
        description:
          "Click the Embed layer to open its settings, paste the Sift script into the HTML field, replace placeholders, and publish your site.",
      },
    ],
    codeSnippet: {
      language: "html",
      code: BASE_SNIPPET,
    },
    alternativeMethods: [
      {
        title: "Custom Code (site-wide)",
        description:
          "In Framer's Site Settings → General → Custom Code, paste the snippet into the End of body field. The widget script loads on every page automatically.",
      },
      {
        title: "Code Component",
        description:
          "Framer Pro users can create a React Code Component that wraps the Sift widget — useful if you want to expose properties (like form ID) in the Framer property panel.",
      },
    ],
    tips: [
      "Set the Embed layer to fill width for a responsive widget",
      "Use Framer's design tokens to match the Sift widget's primary colour to your brand",
      "Combine with Framer animations for a polished entrance effect",
      "The widget Shadow DOM means Framer's typography styles will not affect it",
    ],
    faqs: [
      {
        question: "Does Sift work on the free Framer plan?",
        answer:
          "Yes. The Embed component is available on all Framer plans, including the free tier. Custom Code in Site Settings requires a paid plan.",
      },
      {
        question: "Can I use Sift with Framer's CMS?",
        answer:
          "Yes. Embed the widget on any CMS template page. You can use a different form ID per CMS collection if you want to track submissions per content type.",
      },
      {
        question: "Will Sift work with Framer Code Components?",
        answer:
          "Yes. You can create a React Code Component that wraps the Sift widget and exposes formId and apiKey as Framer properties — a clean way to manage multiple instances visually.",
      },
      {
        question: "Does the widget work in Framer preview mode?",
        answer:
          "Embed scripts load in published environments. To test in preview, use the Preview Live URL Framer provides for each project.",
      },
      {
        question: "Can the widget match my Framer design system?",
        answer:
          "Yes. Use the widget configurator in your Sift dashboard to set primary colour, background, border radius, font, and copy to match your Framer site.",
      },
    ],
    troubleshooting: [
      {
        problem: "Embed shows blank space in the canvas",
        solution:
          "Framer canvas does not always render embedded scripts. Use the Preview button or publish to a staging URL to see the widget render.",
      },
      {
        problem: "Widget overflows its container",
        solution:
          "Set the Embed layer to fill width and auto height in Framer's properties panel. The widget will resize to match its container.",
      },
    ],
    relatedPlatforms: ["webflow", "react", "html"],
  },

  // ---------------------------------------------------------------------------
  // 9. Ghost
  // ---------------------------------------------------------------------------
  {
    slug: "ghost",
    name: "Ghost",
    category: "cms",
    headline: "Add the Sift widget to Ghost using HTML cards or Code Injection",
    description:
      "Embed Sift on any Ghost post or page using the HTML card in the editor, or globally via Settings → Code Injection.",
    intro:
      "Ghost is a clean, content-focused CMS, and Sift fits naturally into its workflow. Use the HTML card for one-off embeds on specific posts or pages, or Code Injection for site-wide installs.",
    difficulty: "Easy",
    estimatedTime: "2 minutes",
    steps: [
      {
        title: "Open the Ghost editor",
        description:
          "Log into Ghost Admin and open the post or page where you want the widget. Click into the editor.",
      },
      {
        title: "Add an HTML card",
        description:
          "Click the + button to add a new card and select HTML from the menu. The HTML card opens with an empty code field.",
      },
      {
        title: "Paste the Sift snippet and publish",
        description:
          "Paste the embed code, replace the placeholders with your dashboard values, click outside the card to confirm, and publish the post.",
      },
    ],
    codeSnippet: {
      language: "html",
      code: BASE_SNIPPET,
    },
    alternativeMethods: [
      {
        title: "Site-wide via Code Injection",
        description:
          "Go to Ghost Admin → Settings → Code Injection. Paste the snippet into the Site Footer field. The widget script loads on every page across the site.",
      },
    ],
    tips: [
      "The HTML card preserves your script as-is — no escaping required",
      "Use the Sift webhook integration to send extracted data into Ghost Members or external CRMs",
      "Code Injection is great for embedding the widget in members-only posts",
      "Ghost themes vary — test the widget on your specific theme to verify spacing looks right",
    ],
    faqs: [
      {
        question: "Does Sift work on Ghost(Pro) and self-hosted Ghost?",
        answer:
          "Yes. Both Ghost(Pro) and self-hosted Ghost support HTML cards and Code Injection. The Sift widget works identically on both.",
      },
      {
        question: "Can I embed Sift in a Ghost members-only post?",
        answer:
          "Yes. The HTML card works in any post type, including members-only and paid posts. The widget is only visible to readers who can access the post.",
      },
      {
        question: "Does Sift work with Ghost's email newsletters?",
        answer:
          "No — embedded scripts do not run inside email clients. Use Sift on the web version of your post and link to it from the newsletter.",
      },
      {
        question: "Will the Sift widget conflict with my Ghost theme?",
        answer:
          "No. The widget renders inside Shadow DOM, isolated from your Ghost theme's CSS.",
      },
      {
        question: "Can I use Sift to capture Ghost Members signups?",
        answer:
          "Yes. Use Sift's webhook integration to send extracted contact data to the Ghost Admin API and create new members programmatically.",
      },
    ],
    troubleshooting: [
      {
        problem: "HTML card preview shows the code as text",
        solution:
          "The preview within the editor sometimes does not run scripts. Publish the post and view it on the live site to see the widget render.",
      },
      {
        problem: "Widget loads but cannot submit",
        solution:
          "Verify your form ID and public API key in the Sift dashboard. Also check that the form is set to Active.",
      },
    ],
    relatedPlatforms: ["wordpress", "html"],
  },
];
