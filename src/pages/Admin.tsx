import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  Mail, 
  Phone, 
  User,
  LogOut,
  RefreshCw
} from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'pending' | 'reviewed';
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const { user, profile, signOut, isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'reviewed'>('all');
  const [sortBy, setSortBy] = useState<'created_at' | 'name' | 'subject'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin())) {
      navigate('/auth');
    }
  }, [user, authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (user && isAdmin()) {
      fetchSubmissions();
    }
  }, [user, isAdmin]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('contact_submissions')
        .select('*')
        .order(sortBy, { ascending: sortOrder === 'asc' });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setSubmissions(data || []);
    } catch (error: any) {
      toast({
        title: 'خطا در دریافت اطلاعات',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSubmissionStatus = async (id: string, status: 'pending' | 'reviewed') => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ 
          status,
          reviewed_by: status === 'reviewed' ? profile?.id : null,
          reviewed_at: status === 'reviewed' ? new Date().toISOString() : null,
        })
        .eq('id', id);

      if (error) {
        throw error;
      }

      setSubmissions(prev => 
        prev.map(sub => 
          sub.id === id 
            ? { ...sub, status } 
            : sub
        )
      );

      toast({
        title: 'وضعیت به‌روزرسانی شد',
        description: `پیام ${status === 'reviewed' ? 'بررسی شده' : 'در انتظار'} علامت‌گذاری شد`,
      });
    } catch (error: any) {
      toast({
        title: 'خطا در به‌روزرسانی',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const filteredSubmissions = submissions.filter(submission =>
    submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (authLoading || !user || !isAdmin()) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="persian-body text-muted-foreground">در حال بررسی دسترسی...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-subtle border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="persian-heading text-3xl font-bold text-foreground mb-2">
                پنل مدیریت
              </h1>
              <p className="persian-body text-muted-foreground">
                مدیریت پیام‌های دریافتی از فرم تماس
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-left">
                <p className="persian-body font-medium text-foreground">
                  {profile?.full_name || 'مدیر سیستم'}
                </p>
                <p className="persian-body text-sm text-muted-foreground">
                  {profile?.email}
                </p>
              </div>
              <Button variant="outline" onClick={signOut}>
                <LogOut className="w-4 h-4 ml-2" />
                خروج
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="persian-body text-sm font-medium">جستجو</label>
              <div className="relative">
                <Search className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="جستجو در نام، ایمیل یا موضوع..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="persian-body text-sm font-medium">وضعیت</label>
              <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه</SelectItem>
                  <SelectItem value="pending">در انتظار</SelectItem>
                  <SelectItem value="reviewed">بررسی شده</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="persian-body text-sm font-medium">مرتب‌سازی</label>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at">تاریخ ارسال</SelectItem>
                  <SelectItem value="name">نام</SelectItem>
                  <SelectItem value="subject">موضوع</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="persian-body text-sm font-medium">ترتیب</label>
              <Select value={sortOrder} onValueChange={(value: any) => setSortOrder(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">جدیدترین</SelectItem>
                  <SelectItem value="asc">قدیمی‌ترین</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="persian-body text-sm text-muted-foreground">
              {filteredSubmissions.length} پیام {statusFilter !== 'all' && `(${statusFilter === 'pending' ? 'در انتظار' : 'بررسی شده'})`}
            </p>
            <Button variant="outline" size="sm" onClick={fetchSubmissions}>
              <RefreshCw className="w-4 h-4 ml-2" />
              به‌روزرسانی
            </Button>
          </div>
        </Card>

        {/* Submissions Table */}
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="persian-body">نام</TableHead>
                  <TableHead className="persian-body">ایمیل</TableHead>
                  <TableHead className="persian-body">تلفن</TableHead>
                  <TableHead className="persian-body">موضوع</TableHead>
                  <TableHead className="persian-body">پیام</TableHead>
                  <TableHead className="persian-body">وضعیت</TableHead>
                  <TableHead className="persian-body">تاریخ</TableHead>
                  <TableHead className="persian-body">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="animate-spin w-6 h-6 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                      <p className="persian-body text-muted-foreground">در حال بارگذاری...</p>
                    </TableCell>
                  </TableRow>
                ) : filteredSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <p className="persian-body text-muted-foreground">پیامی یافت نشد</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="persian-body font-medium">
                        <div className="flex items-center">
                          <User className="w-4 h-4 ml-2 text-muted-foreground" />
                          {submission.name}
                        </div>
                      </TableCell>
                      <TableCell className="persian-body">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 ml-2 text-muted-foreground" />
                          <a href={`mailto:${submission.email}`} className="text-primary hover:underline">
                            {submission.email}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell className="persian-body">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 ml-2 text-muted-foreground" />
                          <a href={`tel:${submission.phone}`} className="text-primary hover:underline">
                            {submission.phone}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell className="persian-body">{submission.subject}</TableCell>
                      <TableCell className="persian-body max-w-xs">
                        <div className="truncate" title={submission.message}>
                          {submission.message}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={submission.status === 'reviewed' ? 'default' : 'secondary'}
                          className="persian-body"
                        >
                          {submission.status === 'reviewed' ? (
                            <>
                              <CheckCircle className="w-3 h-3 ml-1" />
                              بررسی شده
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 ml-1" />
                              در انتظار
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="persian-body text-sm text-muted-foreground">
                        {new Date(submission.created_at).toLocaleDateString('fa-IR')}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant={submission.status === 'reviewed' ? 'outline' : 'default'}
                          onClick={() => 
                            updateSubmissionStatus(
                              submission.id, 
                              submission.status === 'reviewed' ? 'pending' : 'reviewed'
                            )
                          }
                        >
                          {submission.status === 'reviewed' ? 'علامت‌گذاری به عنوان در انتظار' : 'علامت‌گذاری به عنوان بررسی شده'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;