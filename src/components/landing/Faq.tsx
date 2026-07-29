import { MessageCircleQuestionMark } from 'lucide-react';
import { COLDOP_DEFINITION, FAQ_ITEMS } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHeading } from './SectionHeading';

/**
 * Visible FAQ rendered from the same FAQ_ITEMS that feed the FAQPage
 * JSON-LD (see StructuredData.tsx). Keep this list in sync with schema.
 */
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 border-b py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          icon={MessageCircleQuestionMark}
          eyebrow="FAQ"
          title="Frequently asked questions"
          sub={COLDOP_DEFINITION}
        />

        <Accordion type="single" collapsible className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
