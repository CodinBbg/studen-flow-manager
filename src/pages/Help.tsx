import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock,
  AlertCircle,
  DollarSign,
  Shield,
  FileText
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Help = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    priority: "normal"
  });

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support Request Submitted",
      description: "We'll get back to you within 24 hours.",
    });
    setContactForm({ subject: "", message: "", priority: "normal" });
  };

  const faqs = [
    {
      question: "How does the 25% monthly withdrawal limit work?",
      answer: "The system automatically limits your withdrawals to 25% of your total allocated funds per month. This ensures your funds last throughout the semester. For example, if you have $12,000 allocated, you can withdraw up to $3,000 per month."
    },
    {
      question: "What is an emergency withdrawal?",
      answer: "Emergency withdrawals allow you to bypass the monthly 25% limit for urgent expenses like medical bills or unexpected academic costs. These require justification and are reviewed by financial services. Excessive use may affect future loan eligibility."
    },
    {
      question: "How do I allocate funds to different categories?",
      answer: "Use the Fund Allocation page to create budget categories like housing, food, and academic materials. You can set spending limits for each category and track your progress throughout the semester."
    },
    {
      question: "Can I change my monthly spending limit?",
      answer: "The 25% monthly limit is set by policy to ensure responsible spending. However, you can adjust your personal spending goals within this limit through the Settings page."
    },
    {
      question: "What happens if I exceed my monthly limit?",
      answer: "Regular withdrawals that would exceed the 25% limit will be blocked. You can either wait until the next month or submit an emergency withdrawal request with proper justification."
    },
    {
      question: "How are my transactions tracked?",
      answer: "All transactions are automatically recorded and categorized in your Transfer History. You can view detailed records, filter by category or date, and export reports for your records."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground">Get assistance with your student fund management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Options */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Contact Support
              </CardTitle>
              <CardDescription>Get in touch with our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">(555) 123-HELP</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs text-muted-foreground">Mon-Fri 8AM-6PM</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@studentfunds.edu</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs text-muted-foreground">24hr response</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary-light border border-primary rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-primary">Emergency Support</p>
                    <p className="text-xs text-primary">
                      For urgent financial emergencies, call (555) 911-FUND available 24/7
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Download User Guide
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                Financial Aid Office
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Security Center
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ and Contact Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Find answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>Can't find what you're looking for? Send us a message</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitContact} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide detailed information about your question or issue..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Priority</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={contactForm.priority === "low" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setContactForm({...contactForm, priority: "low"})}
                    >
                      Low
                    </Button>
                    <Button
                      type="button"
                      variant={contactForm.priority === "normal" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setContactForm({...contactForm, priority: "normal"})}
                    >
                      Normal
                    </Button>
                    <Button
                      type="button"
                      variant={contactForm.priority === "high" ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => setContactForm({...contactForm, priority: "high"})}
                    >
                      High
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;