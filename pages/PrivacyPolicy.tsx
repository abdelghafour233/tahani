
import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[40px] shadow-2xl border border-gray-100 dark:border-slate-800">
        <div className="flex items-center gap-4 mb-8 border-b dark:border-slate-800 pb-6">
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-2xl text-green-600">
            <ShieldCheck size={40} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">سياسة الخصوصية</h1>
            <p className="text-gray-500 font-bold">آخر تحديث: {new Date().toLocaleDateString('ar-MA')}</p>
          </div>
        </div>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="text-green-500" size={24} /> مقدمة
            </h2>
            <p>
              نحن في <strong>berrima.store</strong> نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيف نقوم بجمع واستخدام وحماية معلوماتك عند زيارة موقعنا أو الشراء منه، وذلك تماشياً مع معايير منصات الإعلانات العالمية مثل فيسبوك (Meta).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Eye className="text-green-500" size={24} /> المعلومات التي نجمعها
            </h2>
            <p className="mb-4">عند قيامك بطلب منتج من متجرنا، نطلب منك تزويدنا بالمعلومات التالية:</p>
            <ul className="list-disc list-inside space-y-2 pr-4">
              <li>الاسم الكامل (لتحديد صاحب الطلب).</li>
              <li>رقم الهاتف (للتواصل وتأكيد الطلب).</li>
              <li>المدينة والعنوان (لضمان توصيل المنتج إلى مكانك الصحيح).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Activity className="text-green-500" size={24} /> تقنيات التتبع والبيكسل (Pixel)
            </h2>
            <p>
              نستخدم تقنيات التتبع مثل <strong>Facebook Pixel</strong> لتحسين تجربتك الإعلانية وتقديم عروض تناسب اهتماماتك. تساعدنا هذه التقنيات في فهم كيفية تفاعلك مع المتجر وقياس فعالية حملاتنا الإعلانية على منصات Meta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Lock className="text-green-500" size={24} /> حماية البيانات
            </h2>
            <p>
              نحن نطبق إجراءات أمنية صارمة لضمان بقاء معلوماتك الشخصية سرية. لا نقوم ببيع أو تأجير أو مشاركة بياناتك مع أي طرف ثالث لأغراض تسويقية، باستثناء شركات الشحن التي تحتاج لعنوانك ورقم هاتفك لتوصيل طلبك.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MessageSquare className="text-green-500" size={24} /> حقوقك
            </h2>
            <p>
              لك الحق دائماً في طلب تصحيح بياناتك أو حذفها من سجلاتنا. يمكنك التواصل معنا في أي وقت لتعديل معلوماتك أو الاستفسار عن كيفية استخدامنا لها.
            </p>
          </section>

          <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700 mt-10">
            <h3 className="font-black mb-2 text-gray-900 dark:text-white text-xl">للاستفسارات والتواصل:</h3>
            <p className="font-bold">عبر الهاتف أو واتساب: 0649075664</p>
            <p className="font-bold">الموقع الإلكتروني: berrima.store</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// استيراد أيقونة Activity المفقودة محلياً في هذا الملف
const Activity = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const MessageSquare = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

export default PrivacyPolicy;
