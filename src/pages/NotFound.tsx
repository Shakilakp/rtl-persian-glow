import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home as HomeIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl font-bold text-white">۴۰۴</span>
        </div>
        <h1 className="persian-heading text-3xl font-bold text-foreground mb-4">
          صفحه مورد نظر یافت نشد
        </h1>
        <p className="persian-body text-muted-foreground mb-8 leading-relaxed">
          متأسفانه صفحه‌ای که دنبال آن می‌گردید وجود ندارد یا حذف شده است
        </p>
        <Link to="/">
          <Button className="btn-hero-primary">
            <HomeIcon className="w-5 h-5 ml-2" />
            بازگشت به خانه
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
