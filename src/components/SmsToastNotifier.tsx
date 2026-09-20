import React from 'react';
import { MessageSquare, CheckCircle, Smartphone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../i18n/LanguageContext';

interface SmsToastNotifierProps {
  toast: {
    id: string;
    phone: string;
    message: string;
  } | null;
  onClose: () => void;
}

export const SmsToastNotifier: React.FC<SmsToastNotifierProps> = ({ toast, onClose }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed top-20 right-4 z-50 max-w-sm w-full bg-[#0E0C0A]/95 backdrop-blur-md text-white p-4 shadow-xl border border-amber-500/30 flex items-start space-x-3.5 rtl:space-x-reverse"
        >
          <div className="p-2.5 bg-gradient-to-br from-emerald-600 to-teal-700 text-amber-300 shadow-md flex-shrink-0">
            <Smartphone className="w-6 h-6 animate-pulse" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" /> {t('smsNotificationSent', 'SMS Notification Sent')}
              </span>
              <span className="text-[10px] text-[#9A9488]">{t('justNow', 'Just Now')}</span>
            </div>
            
            <p className="text-xs font-medium text-[#E7E2D9] mb-1">
              {t('toLabel', 'To:')} <span dir="ltr" className="font-semibold text-emerald-400 whitespace-nowrap inline-block">{toast.phone}</span>
            </p>
            
            <p className="text-xs text-[#B8B2A6] bg-[#17130F]/80 p-2 border border-white/10/50 leading-relaxed font-mono">
              "{toast.message}"
            </p>

            <div className="mt-2 flex items-center text-[11px] text-emerald-400 font-medium gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> {t('deliveredViaGateway', 'Delivered via Delta Bulk SMS Gateway')}
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#9A9488] hover:text-white transition-colors p-1 hover:bg-[#17130F]"
            title={t('dismiss', 'Dismiss notification')}
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
