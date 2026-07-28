import { PersonalInfo, EducationItem, ExperienceItem, SkillCategory } from '../types';

export const PERSONAL_INFO: PersonalInfo = {
  nameEn: 'Ahmed Amer Ahmed',
  nameAr: 'أحمد عامر أحمد',
  titleEn: 'Administrative Manager | Legal & Finance Consultant | Data Analyst',
  titleAr: 'مدير إداري | مستشار قانوني ومالي | أخصائي علوم بيانات وذكاء اصطناعي',
  locationEn: '6th October City, Giza, Egypt',
  locationAr: 'مدينة السادس من أكتوبر، الجيزة، مصر',
  phone: '01146135278',
  email: 'amer14205@gmail.com',
  profileEn: 'Dedicated and detail-oriented professional with experience in legal administration, accounting, and office management. Skilled in financial management, legal research, and administrative leadership. Seeking a full-time role in a dynamic environment that offers career growth and professional development.',
  profileAr: 'مهني متميز ومتخصص ذو خبرة واسعة في الإدارة الفعالة، الاستشارات القانونية، المحاسبة والتحليل المالي، بالإضافة إلى تحليل البيانات والذكاء الاصطناعي. أتمتّع بقدرة عالية على تحسين كفاءة سير العمل، إدارة الميزانيات، صياغة العقود التجارية، وإدارة المخاطر القانونية والمالية.',
  languagesEn: ['Arabic (Native)', 'English (Professional Working)'],
  languagesAr: ['العربية (اللغة الأم)', 'الإنجليزية (مستوى احترافي)'],
};

export const EDUCATION_LIST: EducationItem[] = [
  {
    id: 'edu-1',
    degreeEn: 'Data Science & Artificial Intelligence',
    degreeAr: 'علوم البيانات والذكاء الاصطناعي',
    institutionEn: 'Machinfy Academy, Cairo',
    institutionAr: 'أكاديمية ماشينفي، القاهرة',
    period: '2024 - 2025',
    locationEn: 'Cairo, Egypt',
    locationAr: 'القاهرة، مصر',
  },
  {
    id: 'edu-2',
    degreeEn: "Bachelor's Degree in Law",
    degreeAr: 'ليسانس الحقوق',
    institutionEn: 'Faculty of Law, Helwan University',
    institutionAr: 'كلية الحقوق، جامعة حلوان',
    period: '2017 - 2022',
    locationEn: 'Cairo, Egypt',
    locationAr: 'القاهرة، مصر',
  },
];

export const INITIAL_EXPERIENCE_LIST: ExperienceItem[] = [
  {
    id: 'exp-0',
    titleEn: 'Site Accountant, Admin & HR Officer',
    titleAr: 'محاسب موقع وإداري وأخصائي موارد بشرية (HR)',
    companyEn: 'Al Rawaq Al Arabi Construction (Egyptian Joint Stock Co. - S.A.E.)',
    companyAr: 'شركة الرواق العربي للإنشاءات (شركة مساهمة مصرية - ش.م.م)',
    period: '16 مارس 2025 - حتى الآن',
    isCurrent: true,
    responsibilitiesEn: [
      'Managing site accounting and financial transactions using specialized ERP accounting systems.',
      'Handling Site HR & Personnel functions including attendance tracking, payroll preparation, and workforce records.',
      'Supervising site administrative operations, workflow, and daily log records.',
      'Handling project cost control, petty cash management, and site financial statements.',
      'Ensuring strict adherence to administrative procedures, HR policies, and financial compliance at project sites.'
    ],
    responsibilitiesAr: [
      'إدارة حسابات الموقع والمعاملات المالية اليومية باستخدام نظام الـ ERP المالي المتخصص.',
      'إدارة كافة مهام الموارد البشرية وشؤون العاملين بالموقع (HR) مثل متابعة الحضور والانصراف، إعداد الأجور، وسجلات العمال والموظفين.',
      'الإشراف على العمليات الإدارية وسير العمل وتوثيق سجلات الموقع اليومية.',
      'إدارة النثريات ومصروفات الموقع وضبط التكاليف المالية الخاصة بالمشروع.',
      'متابعة والالتزام بالإجراءات الإدارية والمالية ولوائح الموارد البشرية بدقة عالية في بيئة العمل الميدانية.'
    ]
  },
  {
    id: 'exp-1',
    titleEn: 'Administrative Manager',
    titleAr: 'مدير إداري',
    companyEn: 'Khamis Mohamed Ahmed Contracting Co.',
    companyAr: 'شركة خميس محمد أحمد للمقاولات',
    period: '2023 - 2025',
    responsibilitiesEn: [
      'Directed daily business operations, improving workflow efficiency and productivity.',
      'Supervised employee schedules, performance evaluations, and compliance with policies.',
      'Implemented cost-control measures, reducing unnecessary expenses and optimizing resources.',
      'Developed administrative reports and ensured smooth coordination between departments.',
      'Planned the operations of infrastructure projects including legal and insurance aspects.',
      'Issued invoices related to the pre-paid process for each project to settle deserved payments.'
    ],
    responsibilitiesAr: [
      'إدارة وتوجيه العمليات اليومية للشركة لرفع كفاءة سير العمل وزيادة الإنتاجية.',
      'الإشراف على جداول الموظفين، تقييم الأداء، وضمان الالتزام بسياسات اللوائح الداخلية.',
      'تطبيق تدابير ضبط التكاليف مما ساهم في خفض المصروفات غير الضرورية وتحسين استغلال الموارد.',
      'إعداد التقارير الإدارية الشاملة وضمان التنسيق السلس بين مختلف القطاعات والتحقق من سير الأعمال.',
      'التخطيط لعمليات مشاريع البنية التحتية بما في ذلك الجوانب القانونية والتأمينية.',
      'إصدار الفواتير المتعلقة بالعمليات المستحقة لكل مشروع لتصفية وتسوية الدفعات المستحقة.'
    ]
  },
  {
    id: 'exp-2',
    titleEn: 'Accountant & Finance Analyst',
    titleAr: 'محاسب ومحلل مالي',
    companyEn: 'Al Noor General Contracting Co.',
    companyAr: 'شركة النور للمقاولات العامة',
    period: '2020 - 2023',
    responsibilitiesEn: [
      'Prepared monthly detailed financial reports including Month-To-Date financial statements and salaries budget management.',
      'Monitored company expenditures and optimized cost management strategies aiming to achieve cost savings.',
      'Managed tax filings and ensured strict adherence to financial regulations.',
      'Oversaw invoicing, payments, and financial transactions, improving cash flow efficiency.',
      'Attended public tenders and limited tenders on behalf of the company.'
    ],
    responsibilitiesAr: [
      'إعداد التقارير المالية الشهرية التفصيلية القائمة على القوائم المالية وإدارة ميزانيات الرواتب والأجور.',
      'مراقبة المصروفات وتطوير استراتيجيات إدارة التكاليف لتحقيق أعلى نسب توفير مالية للشركة.',
      'إدارة الإقرارات الضريبية وضمان الالتزام التام باللوائح والقوانين المالية والضريبية.',
      'الإشراف على الفواتير والمدفوعات والمعاملات المالية اليومية مما عزز كفاءة التدفقات النقدية.',
      'المشاركة في المناقصات العامة والمحدودة وتمثيل الشركة رسمياً.'
    ]
  },
  {
    id: 'exp-3',
    titleEn: 'Legal Assistant',
    titleAr: 'مساعد قانوني ومستشار عقود',
    companyEn: 'Mohamed Ezzat Legal Consultancy & Advocacy',
    companyAr: 'مكتب محمد عزت للاستشارات القانونية والمحاماة',
    period: '2017 - 2020',
    responsibilitiesEn: [
      'Company Formation: Advising on optimal legal structures, drafting and negotiating commercial contracts, NDAs, and non-compete agreements.',
      'Legal Compliance: Ensuring compliance with local/international laws, tax regulations, labor laws, and environmental policies.',
      'Dispute Resolution: Representing the company in litigation & arbitration, managing disputes, and negotiating out-of-court settlements.',
      'Legal Consulting: Providing strategic legal advice, risk assessment for new business operations, and supporting M&A deals.',
      'Bankruptcy & Restructuring: Advising on financial restructuring and negotiating with creditors.',
      'Government Relations & Risk Management: Representing the company before government agencies and developing risk management policies.'
    ],
    responsibilitiesAr: [
      'تأسيس الشركات: التوصية بالهياكل القانونية المثلى، صياغة ومفاوضة العقود التجارية واتفاقيات عدم الإفصاح وعدم المنافسة.',
      'الامتثال القانوني: ضمان الالتزام بالقوانين المحلية والدولية، التشريعات الضريبية، قانون العمل والسياسات البيئية.',
      'فض المنازعات: تمثيل الشركة في التقاضي والتحكيم وإدارة النزاعات والتفاوض على التسويات الودية خارج المحاكم.',
      'الاستشارات القانونية: تقديم الاستشارات الاستراتيجية وتقييم المخاطر التشغيلية وتسهيل عمليات الإفلاس وإعادة الهيكلة المالية.',
      'العلاقات الحكومية وإدارة المخاطر: تمثيل الشركة أمام الجهات الحكومية وتطوير سياسات حماية الشركة من المخاطر القانونية.'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'cat-1',
    titleEn: 'Legal & Compliance',
    titleAr: 'الشؤون القانونية والامتثال',
    iconName: 'Scale',
    skillsEn: ['Contract Drafting & Negotiation', 'Legal Research', 'Compliance Auditing', 'Company Formation', 'Dispute Resolution & Arbitration', 'Risk Management'],
    skillsAr: ['صياغة وتفاوض العقود', 'البحث والتحليل القانوني', 'تدقيق الامتثال التشريعي', 'تأسيس الشركات والهياكل', 'فض النزاعات والتحكيم', 'إدارة المخاطر القانونية'],
  },
  {
    id: 'cat-2',
    titleEn: 'Financial Management',
    titleAr: 'الإدارة والتحليل المالي',
    iconName: 'CircleDollarSign',
    skillsEn: ['Budgeting & Forecasting', 'Tax Preparation & Filings', 'Cost Reduction & Control', 'Financial Reporting', 'Cash Flow Optimization', 'Public Tenders & Invoicing'],
    skillsAr: ['إعداد الميزانيات والتنبؤ المالي', 'الإقرارات والالتزامات الضريبية', 'ضبط وخفض التكاليف', 'التقارير المالية الدورية', 'إدارة التدفقات النقدية', 'المناقصات والفواتير'],
  },
  {
    id: 'cat-3',
    titleEn: 'Data Science & Tech',
    titleAr: 'علوم البيانات والتكنولوجيا',
    iconName: 'Database',
    skillsEn: ['Python', 'SQL Database Analysis', 'Power BI Dashboards', 'Oracle ERP Systems', 'MS Excel (Advanced formulas, Pivot Tables)', 'Data Management & Cleaning'],
    skillsAr: ['برمجة بايثون (Python)', 'قواعد البيانات والـ SQL', 'لوحات تحكم Power BI', 'أنظمة Oracle ERP', 'مايكروسوفت إكسيل المتقدم', 'إدارة ومعالجة البيانات'],
  },
  {
    id: 'cat-4',
    titleEn: 'Office & Operations Leadership',
    titleAr: 'القيادة والإدارة التشغيلية',
    iconName: 'Building2',
    skillsEn: ['Workflow Optimization', 'Employee Supervision & Evaluation', 'Cross-departmental Coordination', 'Infrastructure Operations Planning', 'Strategic Negotiation', 'Problem Solving'],
    skillsAr: ['تحسين كفاءة سير العمل', 'الإشراف وتقييم أداء الموظفين', 'التنسيق بين القطاعات', 'تخطيط مشاريع البنية التحتية', 'التفاوض الاستراتيجي', 'حل المشكلات والإدارة'],
  },
];
