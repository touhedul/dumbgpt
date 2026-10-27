import React from 'react';

export const SidebarIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="3" rx="4" />
    <path d="M9 3v18" />
  </svg>
);

export const NewChatIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" />
  </svg>
);

export const ShareIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

export const MoreDotsIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="5" cy="12" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="19" cy="12" r="1.5" />
  </svg>
);

export const CopyIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="13" height="13" x="4" y="8" rx="2" ry="2" />
    <path d="M8 4h10a2 2 0 0 1 2 2v10" />
  </svg>
);

export const CheckIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#10a37f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const EditIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
);

export const ThumbsUpDownIcon = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M15.3702 10.3242C15.3702 9.87178 15.3673 9.66262 15.3516 9.53418L15.3311 9.42676C15.2387 9.08236 14.9921 8.8037 14.668 8.66894L14.5255 8.62012C14.4065 8.58823 14.4058 8.58912 14.378 8.58691L13.9171 8.58203L13.7823 8.56836C13.4795 8.50629 13.2522 8.23813 13.252 7.91699C13.252 7.54972 13.5498 7.25195 13.9171 7.25195H15.5538C16.0484 7.25195 16.4596 7.251 16.794 7.27832C17.1361 7.30627 17.4565 7.36647 17.7589 7.52051L17.9288 7.61621C18.3159 7.85359 18.6317 8.19374 18.8389 8.60058L18.8917 8.71484C19.0069 8.98349 19.0567 9.26596 19.0811 9.56543C19.1085 9.89987 19.1075 10.311 19.1075 10.8057V12.4941C19.1053 12.7802 19.095 13.0234 19.0528 13.2422L19.0235 13.3711C18.8093 14.1702 18.211 14.8058 17.4347 15.0703L17.2764 15.1182C16.941 15.208 16.5519 15.2021 16.0352 15.2021C15.9352 15.2022 15.8414 15.2426 15.7725 15.3115L15.712 15.3896L13.6036 19.0801C13.4704 19.3131 13.2098 19.4434 12.9434 19.4102L12.671 19.376C11.1472 19.1855 10.1637 17.665 10.6153 16.1973L10.922 15.2021H10.0001C9.63284 15.2021 9.33508 14.9043 9.33504 14.5371C9.33504 14.1698 9.63281 13.8721 10.0001 13.8721H11.8223C12.0333 13.8721 12.2321 13.972 12.3575 14.1416C12.4828 14.3113 12.5201 14.5308 12.4581 14.7324L11.8868 16.5889C11.6947 17.2134 12.0658 17.8565 12.6759 18.0225L14.5577 14.7295L14.6173 14.6328C14.8037 14.3518 15.0671 14.1366 15.3702 14.0078V10.3242ZM7.07527 0.589843L7.34871 0.624023L7.48934 0.645507C8.8858 0.900505 9.78198 2.28694 9.44149 3.66504L9.4034 3.80273L9.09383 4.80469C9.26639 4.80872 9.42469 4.81491 9.56844 4.82617C9.93535 4.85495 10.2802 4.91643 10.5948 5.08203L10.8272 5.22168C11.3479 5.57355 11.7179 6.11326 11.8555 6.7334L11.88 6.86328C11.9248 7.16766 11.8933 7.4745 11.8331 7.79102C11.799 7.97017 11.7521 8.16961 11.6954 8.39062L11.4991 9.12207L11.2247 10.1299C11.0567 10.746 10.9317 11.2371 10.6895 11.627L10.5782 11.7881C10.3471 12.0873 10.051 12.329 9.71297 12.4951L9.56551 12.5615C9.0832 12.7605 8.52572 12.748 7.79598 12.748H4.46492C3.97039 12.748 3.55908 12.749 3.22469 12.7217C2.92525 12.6972 2.64273 12.6475 2.3741 12.5322L2.25985 12.4795C1.85303 12.2722 1.51283 11.9564 1.27547 11.5693L1.18074 11.3994C1.02663 11.0969 0.965541 10.7768 0.93758 10.4346C0.910255 10.1001 0.911213 9.68897 0.911213 9.19433V7.87012C0.911211 7.35335 0.905318 6.96434 0.995197 6.62891L1.04305 6.47168C1.30751 5.69506 1.9429 5.09604 2.74227 4.88184L2.87117 4.85254C3.17731 4.79349 3.53146 4.79785 3.98348 4.79785C4.11701 4.79785 4.24047 4.72629 4.30672 4.61035L6.41512 0.919921L6.47078 0.83789C6.61342 0.657078 6.84208 0.560753 7.07527 0.589843ZM16.7003 13.8623C16.811 13.8565 16.8768 13.848 16.9327 13.833L17.0763 13.7842C17.4 13.6492 17.6471 13.3706 17.7393 13.0264L17.7589 12.9189C17.7745 12.7905 17.7774 12.5815 17.7774 12.1299V10.8057C17.7774 10.2891 17.7778 9.94154 17.7559 9.67383C17.74 9.47878 17.7144 9.35924 17.6847 9.27637L17.6534 9.2041C17.5713 9.04316 17.4525 8.90503 17.3077 8.7998L17.1554 8.70605C17.0716 8.66338 16.9456 8.62573 16.6856 8.60449C16.6064 8.59802 16.5203 8.59311 16.4249 8.58984C16.505 8.74522 16.57 8.91021 16.6163 9.08301L16.6456 9.21094C16.6879 9.42971 16.6981 9.67298 16.7003 9.95898V13.8623ZM4.64852 9.67578C4.64852 10.2783 4.65443 10.4495 4.68758 10.5732L4.73641 10.7158C4.87123 11.04 5.14969 11.2876 5.49422 11.3799L5.60164 11.3994C5.73008 11.415 5.93904 11.418 6.3907 11.418H7.79598C8.64567 11.418 8.87848 11.4059 9.0577 11.332L9.19149 11.2666C9.32053 11.1924 9.43391 11.0932 9.52547 10.9746L9.56844 10.9131C9.6649 10.7567 9.74567 10.4973 9.94149 9.7793L10.2159 8.77148L10.4073 8.05957C10.4589 7.85882 10.4984 7.6904 10.5264 7.54297C10.568 7.3245 10.5755 7.19026 10.5684 7.09961L10.5577 7.02148C10.4941 6.73503 10.3227 6.48568 10.0821 6.32324L9.97469 6.25879C9.89449 6.2167 9.75934 6.17549 9.46395 6.15234C9.16443 6.12888 8.77153 6.12793 8.19637 6.12793C7.98563 6.12785 7.78753 6.0278 7.66219 5.8584C7.53687 5.68873 7.49869 5.4692 7.56063 5.26758L8.13192 3.41113L8.16317 3.28418C8.27278 2.70117 7.91206 2.13103 7.34285 1.97656L5.46102 5.27051C5.27333 5.59878 4.98538 5.84809 4.64852 5.99121V9.67578ZM2.24129 9.19433C2.24129 9.71091 2.24188 10.0585 2.26375 10.3262C2.28499 10.5861 2.32265 10.7122 2.36531 10.7959L2.45906 10.9482C2.56437 11.0932 2.70323 11.2119 2.86434 11.2939L2.9366 11.3252C3.0194 11.3548 3.13872 11.3796 3.33309 11.3955C3.41216 11.402 3.49855 11.4059 3.59383 11.4092C3.53863 11.3021 3.4897 11.1909 3.45027 11.0752L3.40242 10.917C3.31261 10.5816 3.31844 10.1925 3.31844 9.67578V6.13672C3.26922 6.13929 3.2289 6.1423 3.19442 6.14648L3.08699 6.16699C2.7426 6.25927 2.46406 6.50612 2.32918 6.83008L2.28035 6.97363C2.24726 7.09732 2.24129 7.26819 2.24129 7.87012V9.19433Z" />
  </svg>
);

export const FeedbackIcon = ThumbsUpDownIcon;

export const ThumbsUpIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
  </svg>
);

export const ThumbsDownIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 14V2" />
    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
  </svg>
);

export const ReadAloudIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

export const RegenerateIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
);

export const ScrollDownIcon = ({ size = 15, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const PlusIcon = ({ size = 17, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const MicIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);

export const VoiceWaveIcon = ({ size = 32, className = "" }) => (
  <div 
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2px',
      cursor: 'pointer',
      boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
      flexShrink: 0
    }}
    className={className}
    title="Start Voice"
  >
    <span style={{ width: '2px', height: '10px', backgroundColor: '#0d0d0d', borderRadius: '1px' }}></span>
    <span style={{ width: '2px', height: '15px', backgroundColor: '#0d0d0d', borderRadius: '1px' }}></span>
    <span style={{ width: '2px', height: '11px', backgroundColor: '#0d0d0d', borderRadius: '1px' }}></span>
    <span style={{ width: '2px', height: '6px', backgroundColor: '#0d0d0d', borderRadius: '1px' }}></span>
  </div>
);

export const SendArrowIcon = ({ size = 32, disabled = false, className = "" }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: disabled ? '#3b3b3b' : '#ffffff',
      color: disabled ? '#676767' : '#0d0d0d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: disabled ? 'none' : '0 1px 6px rgba(0,0,0,0.25)',
      transition: 'all 0.15s ease',
      flexShrink: 0
    }}
    className={className}
  >
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  </div>
);

export const StopIcon = ({ size = 32, className = "" }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0
    }}
    className={className}
    title="Stop Generating"
  >
    <span style={{ width: '9px', height: '9px', backgroundColor: '#0d0d0d', borderRadius: '2px' }}></span>
  </div>
);

export const ChatGPTLogo = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3428 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3428 7.8956zm16.5991 3.8558L13.1038 8.383 15.1239 7.2147a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79 79 0 0 0-.407-.6816zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.6606zM13.7915 12l-2.8574-1.6511 2.8574-1.6511 2.8574 1.6511z" />
  </svg>
);
