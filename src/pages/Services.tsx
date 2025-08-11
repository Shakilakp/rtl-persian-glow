import { BarChart3, Code2, Database, Brain, Cloud, Shield, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      icon: BarChart3,
      title: 'هوش تجاری',
      description: 'تبدیل داده‌های خام به بینش‌های قابل اجرا برای تصمیم‌گیری بهتر',
      features: [
        'داشبوردهای تعاملی',
        'گزارش‌گیری پیشرفته',
        'تحلیل روندها',
        'پیش‌بینی آینده'
      ],
      price: 'قیمت از ۵۰ میلیون تومان'
    },
    {
      icon: Code2,
      title: 'توسعه نرم‌افزار',
      description: 'طراحی و توسعه راه‌حل‌های نرم‌افزاری مدرن و قابل اعتماد',
      features: [
        'اپلیکیشن‌های وب',
        'اپلیکیشن‌های موبایل',
        'سیستم‌های مدیریت',
        'نرم‌افزارهای سفارشی'
      ],
      price: 'قیمت از ۳۰ میلیون تومان'
    },
    {
      icon: Database,
      title: 'تحلیل داده',
      description: 'استخراج الگوها و روندهای مهم از داده‌های پیچیده شما',
      features: [
        'پردازش داده‌های بزرگ',
        'مدل‌سازی آماری',
        'تجسم داده',
        'گزارش‌های تحلیلی'
      ],
      price: 'قیمت از ۲۰ میلیون تومان'
    },
    {
      icon: Brain,
      title: 'هوش مصنوعی',
      description: 'پیاده‌سازی راه‌حل‌های هوش مصنوعی برای خودکارسازی فرآیندها',
      features: [
        'پردازش زبان طبیعی',
        'بینایی کامپیوتر',
        'یادگیری ماشین',
        'تشخیص الگو'
      ],
      price: 'قیمت از ۱۰۰ میلیون تومان'
    },
    {
      icon: Cloud,
      title: 'راه‌حل‌های ابری',
      description: 'مهاجرت و مدیریت زیرساخت‌های ابری با امنیت بالا',
      features: [
        'مهاجرت به کلود',
        'مدیریت سرورها',
        'پشتیبان‌گیری',
        'بهینه‌سازی هزینه'
      ],
      price: 'قیمت از ۴۰ میلیون تومان'
    },
    {
      icon: Shield,
      title: 'امنیت سایبری',
      description: 'محافظت از داده‌ها و سیستم‌های شما در برابر تهدیدات سایبری',
      features: [
        'ارزیابی امنیت',
        'نفوذ اخلاقی',
        'مانیتورینگ امنیت',
        'آموزش کاربران'
      ],
      price: 'قیمت از ۶۰ میلیون تومان'
    }
  ];

  const process = [
    {
      step: '۱',
      title: 'مشاوره اولیه',
      description: 'بررسی نیازها و ارائه راهکار مناسب'
    },
    {
      step: '۲',
      title: 'طراحی و برنامه‌ریزی',
      description: 'تهیه طرح جامع و زمان‌بندی پروژه'
    },
    {
      step: '۳',
      title: 'توسعه و پیاده‌سازی',
      description: 'اجرای پروژه با کیفیت بالا'
    },
    {
      step: '۴',
      title: 'تست و تحویل',
      description: 'آزمایش کامل و تحویل نهایی'
    },
    {
      step: '۵',
      title: 'پشتیبانی',
      description: 'خدمات پس از فروش و نگهداری'
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <h1 className="persian-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
              خدمات حرفه‌ای ما
            </h1>
            <p className="persian-body text-xl text-muted-foreground leading-relaxed">
              با استفاده از جدیدترین تکنولوژی‌ها و روش‌های نوین، راه‌حل‌های منحصر به فرد برای کسب‌وکار شما ارائه می‌دهیم
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="service-card h-full">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="persian-heading text-2xl font-semibold text-foreground mb-4">
                  {service.title}
                </h3>
                
                <p className="persian-body text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="persian-body text-sm text-muted-foreground flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full ml-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto pt-6 border-t border-border">
                  <p className="persian-body text-sm text-primary font-semibold mb-4">
                    {service.price}
                  </p>
                  <Button className="w-full" variant="outline">
                    درخواست مشاوره
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="persian-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              فرآیند همکاری
            </h2>
            <p className="persian-body text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              مراحل ساده و شفاف برای شروع همکاری با ما
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center fade-in-scale">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="persian-heading text-lg font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="persian-body text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto fade-in-up">
            <h2 className="persian-heading text-3xl md:text-4xl font-bold mb-6">
              پروژه‌تان را با ما شروع کنید
            </h2>
            <p className="persian-body text-xl mb-8 text-white/90 leading-relaxed">
              تیم متخصص ما آماده ارائه بهترین راه‌حل برای نیازهای شما است
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                درخواست مشاوره رایگان
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                مشاهده نمونه کارها
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;