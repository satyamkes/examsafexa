import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Is ExamSafexa free to use?",
    a: "Yes — finding your center, seeing your route, and joining your exam community are all free for students.",
  },
  {
    q: "Is live location sharing mandatory?",
    a: "No. It's entirely optional and off by default. You choose whether to enable it, for how long, and who can see it.",
  },
  {
    q: "How is my data used?",
    a: "Your details are used only to match you with your exam center and community, and — if you opt in — to power the safety layer. We don't sell your data.",
  },
  {
    q: "Which exams are supported?",
    a: "NEET, JEE, UPSC, SSC, and various State PCS exams to start, with more added each season based on demand.",
  },
  {
    q: "Is this affiliated with any exam board?",
    a: "No. ExamSafexa is an independent student-community platform, not affiliated with NTA, UPSC, SSC, or any other examination body.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-24 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
          FAQs
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
          Common questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="mt-10">
        {FAQS.map((faq, i) => (
          <AccordionItem key={faq.q} value={`item-${i}`}>
            <AccordionTrigger>{faq.q}</AccordionTrigger>
            <AccordionContent>{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
