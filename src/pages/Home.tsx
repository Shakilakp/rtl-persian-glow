import { ArrowLeft, ChevronDown, BarChart3, Code2, Database, Users, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Home = () => {
  const stats = [
    { icon: Users, value: '۱۰۰+', label: 'مشتری راضی' },
    { icon: Award, value: '۳۰۰+', label: 'پروژه موفق' },
    { icon: Clock, value: '۵+', label: 'سال تجربه' },
    { icon: Code2, value: '۲۴/۷', label: 'پشتیبانی' },
  ];

  const features = [
    {
      icon: BarChart3,
      title: 'هوش تجاری',
      description: 'تبدیل داده‌های خام به بینش‌های قابل اجرا برای تصمیم‌گیری بهتر'
    },
    {
      icon: Code2,
      title: 'توسعه نرم‌افزار',
      description: 'طراحی و توسعه راه‌حل‌های نرم‌افزاری مدرن و قابل اعتماد'
    },
    {
      icon: Database,
      title: 'تحلیل داده',
      description: 'استخراج الگوها و روندهای مهم از داده‌های پیچیده شما'
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background/50"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8 fade-in-up">
            <h1 className="persian-heading text-5xl md:text-7xl font-bold text-white mb-6">
              آینده
              <span className="text-accent block md:inline md:mr-4">دیجیتال</span>
              را با ما بسازید
            </h1>
            
            <p className="persian-body text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              شرکت پیشرو در توسعه نرم‌افزار، هوش تجاری و تحلیل داده با تیمی از متخصصان مجرب
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button size="lg" className="btn-hero-primary text-lg px-8 py-4">
                شروع همکاری
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
              <Button size="lg" variant="outline" className="btn-hero-secondary text-lg px-8 py-4">
                مشاهده نمونه کارها
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center fade-in-scale">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="persian-heading text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="persian-body text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="persian-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              خدمات حرفه‌ای ما
            </h2>
            <p className="persian-body text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              با استفاده از جدیدترین تکنولوژی‌ها، راه‌حل‌های نوآورانه ارائه می‌دهیم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="service-card text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="persian-heading text-2xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="persian-body text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto fade-in-up">
            <h2 className="persian-heading text-4xl md:text-5xl font-bold mb-6">
              آماده شروع پروژه بعدی هستید؟
            </h2>
            <p className="persian-body text-xl mb-8 text-white/90 leading-relaxed">
              با تیم متخصص ما تماس بگیرید و پروژه‌تان را به واقعیت تبدیل کنید
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg">
              تماس با ما
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;