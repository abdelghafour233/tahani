
import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Zap, MessageSquare } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[40px] shadow-2xl border border-gray-100 dark:border-slate-800">
        <div className="flex items-center gap-4 mb-8 border-b dark:border-slate-800 pb-6">
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-2xl text-green-600">
            <ShieldCheck size={40} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">سياسة الخصوصية والمنتجات الرقمية</h1>
            <p className="text-gray-500 font-bold">آخر تحديث: {new Date().toLocaleDateString('ar-MA')}</p>
          </div>
        </div>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-lg text-right">
          <section>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="text-green-500" size={24} /> مقدمة
            </h2>
            <p>
              نحن في <strong>berrima.store</strong> ندرك أهمية حماية بياناتك الشخصية عند شراء المنتجات والخدمات الرقمية. توضح هذه السياسة كيفية التعامل مع معلوماتك لضمان تفعيل اشتراكاتك بأمان وسرعة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Zap className="text-green-500" size={24} /> تسليم المنتجات الرقمية
            </h2>
            <p>
              بما أننا نقدم خدمات رقمية (اشتراكات وحسابات)، فإن التسليم يتم حصرياً عبر الواتساب أو البريد الإلكتروني الذي تزودنا به. لا يتم شحن أي طرود فيزيائية. نلتزم بتوصيل بيانات التفعيل خلال مدة لا تتجاوز 24 ساعة كحد أقصى.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Lock className="text-green-500" size={24} /> سرية الحسابات
            </h2>
            <p>
              جميع الحسابات والاشتراكات التي يتم بيعها هي رسمية ومضمونة. نلتزم بعدم مشاركة بيانات الدخول الخاصة بك مع أي طرف آخر. كما ننصحك بتغيير كلمات المرور فور استلامك للحسابات لضمان أعلى مستوى من الأمان.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MessageSquare className="text-green-500" size={24} /> الاسترجاع والاستبدال
            </h2>
            <p>
              نظراً لطبيعة المنتجات الرقمية، لا يمكن إلغاء الطلب بعد استلام بيانات التفعيل إلا في حالة وجود خلل فني في الخدمة لم نتمكن من إصلاحه خلال 48 ساعة. في هذه الحالة، يتم تعويض الزبون بحساب جديد أو استرجاع المبلغ.
            </p>
          </section>

          <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700 mt-10">
            <h3 className="font-black mb-2 text-gray-900 dark:text-white text-xl">للاستفسارات التقنية:</h3>
            <p className="font-bold">واتساب الدعم الفني: 0688775968</p>
            <p className="font-bold">الموقع: berrima.store</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
