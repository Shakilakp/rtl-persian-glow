import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "تلفن تماس",
      value: "021-86096368",
      description: "شنبه تا پنج‌شنبه، ۹ تا ۱۸",
    },
    {
      icon: Mail,
      title: "ایمیل",
      value: "info.viraap.co",
      description: "پاسخ در کمتر از ۲۴ ساعت",
    },
    {
      icon: MapPin,
      title: "آدرس دفتر",
      value: "تهران، کارگر شمالی، خیابان نهم، پلاک ۸۲، واحد ۱",
      description: "طبقه ۵، واحد ۱۰",
    },
    {
      icon: Clock,
      title: "ساعات کاری",
      value: "شنبه تا چهارشنبه",
      description: "۹:۰۰ تا ۱۸:۰۰",
    },
  ];

  const services = [
    "توسعه نرم‌افزار",
    "هوش تجاری",
    "تحلیل داده",
    "مشاوره فناوری",
    "امنیت سایبری",
    "راه‌حل‌های ابری",
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <h1 className="persian-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
              تماس با ما
            </h1>
            <p className="persian-body text-xl text-muted-foreground leading-relaxed">
              آماده پاسخگویی به سوالات شما و ارائه بهترین راه‌حل‌ها هستیم
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-medium transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="persian-heading text-lg font-semibold text-foreground mb-2 text-center">
                  {info.title}
                </h3>
                <p className="persian-body font-medium text-primary mb-1 text-center">
                  {info.value}
                </p>
                <p className="persian-body text-sm text-muted-foreground text-center">
                  {info.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="fade-in-up">
              <Card className="p-8">
                <div className="mb-8">
                  <h2 className="persian-heading text-3xl font-bold text-foreground mb-4">
                    فرم تماس
                  </h2>
                  <p className="persian-body text-muted-foreground leading-relaxed">
                    پیام خود را برای ما ارسال کنید تا در اسرع وقت با شما تماس
                    بگیریم
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="persian-body">
                        نام و نام خانوادگی
                      </Label>
                      <div className="relative">
                        <User className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className="pr-10"
                          placeholder="نام خود را وارد کنید"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="persian-body">
                        شماره تماس
                      </Label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pr-10 ltr-content"
                          placeholder="09123456789"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="persian-body">
                      ایمیل
                    </Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pr-10 ltr-content"
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="persian-body">
                      موضوع
                    </Label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground persian-body"
                      required
                    >
                      <option value="">انتخاب کنید...</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                      <option value="other">سایر موارد</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="persian-body">
                      پیام شما
                    </Label>
                    <div className="relative">
                      <MessageSquare className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="pr-10 min-h-32"
                        placeholder="پیام خود را اینجا بنویسید..."
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-hero-primary">
                    <Send className="w-5 h-5 ml-2" />
                    ارسال پیام
                  </Button>
                </form>
              </Card>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8 fade-in-scale">
              {/* Map */}
              <Card className="overflow-hidden">
                <div className="h-64 bg-muted flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-4" />
                    <p className="persian-body">
                      نقشه در اینجا نمایش داده می‌شود
                    </p>
                  </div>
                </div>
              </Card>

              {/* FAQ */}
              <Card className="p-6">
                <h3 className="persian-heading text-xl font-semibold text-foreground mb-6">
                  سوالات متداول
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="persian-body font-medium text-foreground mb-2">
                      زمان پاسخگویی چقدر است؟
                    </h4>
                    <p className="persian-body text-sm text-muted-foreground">
                      معمولاً در کمتر از ۲۴ ساعت پاسخ داده می‌شود.
                    </p>
                  </div>
                  <div>
                    <h4 className="persian-body font-medium text-foreground mb-2">
                      آیا مشاوره اولیه رایگان است؟
                    </h4>
                    <p className="persian-body text-sm text-muted-foreground">
                      بله، جلسه مشاوره اولیه کاملاً رایگان است.
                    </p>
                  </div>
                  <div>
                    <h4 className="persian-body font-medium text-foreground mb-2">
                      چگونه می‌توانم پروژه‌ام را شروع کنم؟
                    </h4>
                    <p className="persian-body text-sm text-muted-foreground">
                      فقط کافی است فرم بالا را پر کنید یا با ما تماس بگیرید.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
