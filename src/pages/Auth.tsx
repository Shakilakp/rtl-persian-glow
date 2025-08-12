import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogIn, UserPlus } from 'lucide-react';

const signInSchema = z.object({
  email: z.string().email('ایمیل معتبر وارد کنید'),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
});

const signUpSchema = signInSchema.extend({
  fullName: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'رمز عبور و تکرار آن باید یکسان باشند',
  path: ['confirmPassword'],
});

type SignInForm = z.infer<typeof signInSchema>;
type SignUpForm = z.infer<typeof signUpSchema>;

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const signInForm = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const signUpForm = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (data: SignInForm) => {
    setLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      if (error) {
        toast({
          title: 'خطا در ورود',
          description: error.message === 'Invalid login credentials' 
            ? 'ایمیل یا رمز عبور اشتباه است'
            : error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'ورود موفق',
          description: 'به پنل مدیریت خوش آمدید',
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: 'خطا',
        description: 'مشکلی در ورود پیش آمد',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (data: SignUpForm) => {
    setLoading(true);
    try {
      const { error } = await signUp(data.email, data.password, data.fullName);
      if (error) {
        toast({
          title: 'خطا در ثبت نام',
          description: error.message === 'User already registered'
            ? 'کاربری با این ایمیل قبلاً ثبت نام کرده'
            : error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'ثبت نام موفق',
          description: 'لطفاً ایمیل خود را بررسی کنید',
        });
        setIsSignUp(false);
      }
    } catch (error) {
      toast({
        title: 'خطا',
        description: 'مشکلی در ثبت نام پیش آمد',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="persian-heading text-3xl font-bold text-foreground mb-2">
            {isSignUp ? 'ثبت نام' : 'ورود'}
          </h1>
          <p className="persian-body text-muted-foreground">
            {isSignUp 
              ? 'برای دسترسی به پنل مدیریت ثبت نام کنید'
              : 'برای دسترسی به پنل مدیریت وارد شوید'
            }
          </p>
        </div>

        {isSignUp ? (
          <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="persian-body">نام و نام خانوادگی</Label>
              <Input
                id="fullName"
                {...signUpForm.register('fullName')}
                placeholder="نام کامل خود را وارد کنید"
                className="text-right"
              />
              {signUpForm.formState.errors.fullName && (
                <p className="text-sm text-destructive persian-body">
                  {signUpForm.formState.errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="persian-body">ایمیل</Label>
              <Input
                id="email"
                type="email"
                {...signUpForm.register('email')}
                placeholder="example@email.com"
                className="ltr-content"
              />
              {signUpForm.formState.errors.email && (
                <p className="text-sm text-destructive persian-body">
                  {signUpForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="persian-body">رمز عبور</Label>
              <Input
                id="password"
                type="password"
                {...signUpForm.register('password')}
                placeholder="رمز عبور"
                className="ltr-content"
              />
              {signUpForm.formState.errors.password && (
                <p className="text-sm text-destructive persian-body">
                  {signUpForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="persian-body">تکرار رمز عبور</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...signUpForm.register('confirmPassword')}
                placeholder="تکرار رمز عبور"
                className="ltr-content"
              />
              {signUpForm.formState.errors.confirmPassword && (
                <p className="text-sm text-destructive persian-body">
                  {signUpForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin ml-2" />
              ) : (
                <UserPlus className="w-4 h-4 ml-2" />
              )}
              ثبت نام
            </Button>
          </form>
        ) : (
          <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="persian-body">ایمیل</Label>
              <Input
                id="email"
                type="email"
                {...signInForm.register('email')}
                placeholder="example@email.com"
                className="ltr-content"
              />
              {signInForm.formState.errors.email && (
                <p className="text-sm text-destructive persian-body">
                  {signInForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="persian-body">رمز عبور</Label>
              <Input
                id="password"
                type="password"
                {...signInForm.register('password')}
                placeholder="رمز عبور"
                className="ltr-content"
              />
              {signInForm.formState.errors.password && (
                <p className="text-sm text-destructive persian-body">
                  {signInForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin ml-2" />
              ) : (
                <LogIn className="w-4 h-4 ml-2" />
              )}
              ورود
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => setIsSignUp(!isSignUp)}
            className="persian-body"
          >
            {isSignUp 
              ? 'قبلاً ثبت نام کرده‌اید؟ وارد شوید'
              : 'حساب کاربری ندارید؟ ثبت نام کنید'
            }
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;