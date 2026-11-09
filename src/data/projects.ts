import type { CaseStudy, PortfolioProject, ProjectCardData, ProjectId } from '../types/portfolio';

const caseStudies: CaseStudy[] = [
  {
    id: 'sync', title: 'SYNC PLATFORM', category: 'DIGITAL DENTISTRY / B2B PLATFORM',
    subtitle: '치과와 기공소의 업무가 자연스럽게 이어지는 플랫폼.',
    period: '2022.07 — 현재 · 주요 기능별 참여 기간 상이', role: '웹팀 책임연구원 · 팀장 / 프론트엔드 및 서버 기능 개발',
    stack: 'React, TypeScript, Vite, React Query, Zustand, NestJS, Turborepo', image: 'project-sync-official.jpg', imageFit: 'contain', imageAlt: 'DOF Sync 공식 프로젝트 관리 제품 이미지', imageNote: 'DOF Sync 공식 소개 페이지에서 제공하는 제품 이미지입니다.', imageSource: 'https://doflab.com/en/software/sync',
    blocks: [
      ['CONTEXT', '현장의 업무를 제품 안으로', 'Sync는 치과·기공소·보철물 디자이너의 업무를 연결하는 플랫폼입니다. 파일과 프로젝트를 관리하는 흐름 위에 멤버십 결제와 전자장부 기능을 더하며, 사용자의 일상적인 업무가 서비스 안에서 이어지도록 개발했습니다.'],
      ['MEMBERSHIP', '용량과 결제의 연결', '2025.10–2026.03, 클라우드 사용 용량을 업그레이드하는 멤버십 결제의 프론트엔드 기능을 개발했습니다. 이용 용량과 권한, 결제의 사용자 흐름을 연결하는 기능에 참여했으며 프로젝트 기여도는 80%입니다.'],
      ['BILLING', '의료 현장의 거래·청구 업무', '2025.01–2025.07, 청구서·세금계산서 등 전자장부 기능을 개발했습니다. 기존 ERP 경험을 바탕으로 업무 규칙과 데이터의 흐름을 사용자 화면에 반영했습니다. 프로젝트 기여도는 50%입니다.'],
      ['COLLABORATION', '기능의 경계를 함께 정하기', '기획·디자인·백엔드·QA와 요구사항, API 계약, 릴리스 범위를 함께 정리했습니다. 공통 모듈과 테스트, Jira·Confluence 기록을 통해 팀의 변경 이력을 관리했습니다.']
    ],
    scope: '멤버십 결제의 기여 범위는 프론트엔드 기능입니다. 결제 서버·정산 시스템 전체의 설계를 의미하지 않습니다. 기여도는 제공된 경력 자료 기준입니다.'
  },
  {
    id: 'systems', title: 'BEHIND THE SCREEN', category: 'BACKEND ENGINEERING / API & DATA',
    subtitle: '데이터의 주인과 실패한 다음의 흐름을 먼저 정합니다.',
    period: '2026.10', role: 'NestJS API, 데이터 계약, 캐시, 마이그레이션 및 테스트 구현',
    stack: 'NestJS, TypeScript, MySQL, MongoDB, AWS S3, Swagger, Jest', image: 'project-systems.svg',
    blocks: [
      ['API BOUNDARIES', '시스템 사이의 명확한 계약', '계정정보 조회·저장 API에서 권한과 입력값을 검증하고, 외부 인증 서비스의 DB를 직접 수정하는 대신 서버 세션 기반 API로 연동했습니다. 필드 누락과 명시적 삭제, 구버전 호환, 늦게 도착한 응답의 처리 규칙을 정의했습니다.'],
      ['CONSISTENCY', '저장과 후처리의 성공을 구분', '환자 복수 삭제에서 삭제 보관과 연결 프로젝트 처리를 MySQL 트랜잭션으로 묶었습니다. 커밋 후 MongoDB 알림 정리와 소켓 통지를 분리하고, 후처리 실패가 이미 완료된 삭제를 실패로 표시하지 않도록 재시도와 로그를 보완했습니다.'],
      ['PERFORMANCE', '조회 경로에서 찾은 개선', 'S3 메타데이터를 공유 인메모리 캐시에 저장하고 진행 중인 동일 요청은 Promise를 공유하도록 구현했습니다. TTL과 크기 제한, 변경 시 무효화, 오래된 응답의 재등록 방지를 함께 처리했습니다. 권한 정보는 캐시 대상에서 분리했습니다.'],
      ['VERIFICATION', '계약과 변경을 검증 가능한 형태로', 'Swagger의 성공·오류 계약, 재실행 가능한 마이그레이션, 단위·HTTP·실제 DB 회귀 테스트를 작성했습니다. 시스템별 데이터 소유권과 저장 순서, 부분 실패 후 복구 흐름을 문서로 남겼습니다.']
    ],
    scope: '계정정보 API는 확인된 리비전의 구현 경험을 소개합니다. 해당 시점에 운영 마이그레이션·배포·일부 프론트엔드 통합은 남아 있었습니다. 캐시는 프로세스 내 인메모리 방식입니다. 측정 근거가 없는 성능 개선 수치는 사용하지 않았습니다.'
  },
  {
    id: 'cross-platform', title: 'BEYOND THE BROWSER', category: 'WEB · MOBILE · DESKTOP / 3D',
    subtitle: 'DOF Sync Mobile로 이어지는 웹·모바일 경험.',
    period: '2022 — 2024 · 프로젝트별 참여', role: 'React Native 앱 신규 개발·배포, Electron 기능 및 3D 웹뷰 개발',
    stack: 'React, React Native, Electron, Three.js, React Three Fiber, Next.js',
    images: [
      {file: 'dof-sync-mobile-board.png', alt: 'DOF Sync Mobile 프로젝트 대시보드 공식 스크린샷'},
      {file: 'dof-sync-mobile-viewer.png', alt: 'DOF Sync Mobile 3D 파일 뷰어 공식 스크린샷'}
    ],
    imageNote: 'DOF Sync Mobile 공식 앱스토어의 프로젝트 대시보드와 3D 파일 뷰어 스크린샷입니다.',
    imageSource: 'https://apps.apple.com/kr/app/dof-sync-mobile/id6451134757', imageSourceLabel: 'App Store ↗',
    url: 'https://apps.apple.com/kr/app/dof-sync-mobile/id6451134757', urlLabel: 'VIEW ON APP STORE ↗',
    blocks: [
      ['MOBILE', '앱을 처음부터 배포까지', '2022.07–2022.10, 치아 디자인 서비스 Bridge Mobile을 React Native로 신규 개발하고 Android·iOS에 배포했습니다. 프로젝트 기여도는 100%입니다. 2023.05–2023.07에는 DOF Sync Mobile 개발에도 참여했습니다.'],
      ['DESKTOP', '실제 작업 환경과 맞닿는 서비스', '2023.01–2023.04, React·Electron 기반 Sync 오프라인 버전과 Clinic 개발에 참여했습니다. 로컬 파일과 프로젝트 경로, API의 정합성을 살피고 자동 업데이트와 실행 오류를 개선했습니다.'],
      ['3D & INTEGRATION', '의료 데이터의 사용자 접점', '2024.05–2024.06, 환자관리프로그램 덴트웹과 Sync를 연동하고 치아 스캔 데이터를 웹에서 확인하는 3D 웹뷰를 제작했습니다. React·Three.js·React Three Fiber를 사용했으며 프로젝트 기여도는 100%입니다.'],
      ['WEB', '사용 환경에 맞춰 확장하기', '밀링머신 관리 서비스 MotionApp의 웹 버전 개발, DOF 홈페이지의 WordPress에서 Next.js 전환, Admin 백오피스 개발과 유지보수에도 참여했습니다.']
    ],
    scope: '프로젝트마다 참여 기간과 역할이 다릅니다. 의료 데이터 연동 경험은 의료기기 인허가나 의료 AI 모델 개발 경험을 의미하지 않습니다.'
  },
  {
    id: 'operations', title: 'BUILT TO KEEP RUNNING', category: 'BUSINESS SYSTEMS / DELIVERY & OPERATIONS',
    subtitle: '기능을 만드는 일에서, 계속 작동하도록 책임지는 일까지.',
    period: '2014.03 — 현재', role: '업무 시스템 개발·유지보수, AWS 운영 개선 및 팀 개발 체계',
    stack: 'C#.NET, ASP.NET, MSSQL, Java, Spring Framework, React, AWS, Jenkins', image: 'project-operations.svg',
    blocks: [
      ['FOUNDATION', '업무 규칙을 코드로 옮기는 경험', '문화일보에서 ERP와 연말정산 프로그램을 개발·유지보수하고, MSSQL을 사용한 DB 작업도 함께 수행했습니다. 세법과 업무 규칙의 변경을 프로그램과 데이터 처리에 반영하고 Crystal Reports 기반 리포트를 관리했습니다. Java·Spring Framework 기반 그룹웨어 개발과 React·Redux 기반 지국 판매 현황 웹페이지 개발도 수행했습니다.'],
      ['OPERATIONS', '서비스가 이어지는 환경 전환', '2026.10, 운영 서버 2대를 Amazon Linux 1에서 Amazon Linux 2023으로 무중단 이전했습니다. 운영 API의 오류를 분석·수정하고 릴리스별 DB 변경 자료와 실행 순서를 관리했습니다.'],
      ['SECURITY & QUALITY', '변경 이력과 검증을 남기기', '접근권한 부여·변경·말소 이력의 3년 보관 체계를 구축하고 관리자 로그인 reCAPTCHA의 서버 검증을 보완했습니다. 개발·검증 결과와 실제 운영 반영 단계를 구분해 기록했습니다.'],
      ['TEAM & AI', '반복 작업을 줄이고 판단에 집중', 'AI를 활용한 버그 수정 PR 생성과 병합 후 자동배포 흐름을 구축했습니다. 모노레포와 공통 모듈, 테스트 및 기술 공유를 통해 팀의 개발 체계를 정리했습니다. 생성된 코드도 기존 구조와 대조하고 테스트·리뷰를 거쳐 반영했습니다.']
    ],
    scope: 'ERP·그룹웨어는 문화일보 경력, AWS·보안 및 AI 개발 흐름은 디오에프 경력입니다. Spring Framework 경험이며 Spring Boot 경험으로 표기하지 않았습니다.'
  },
  {
    id: 'madi', title: 'MADI — MUSIC TO SCORE', category: 'PERSONAL SIDE PROJECT / MUSIC & TECHNOLOGY',
    subtitle: '듣고, 고치고, 연주하세요. 음악 연습을 위한 나만의 작업실.',
    period: '2026.10 — 현재', role: '개인 사이드 프로젝트 · 기획, 웹·서버 개발, AI 채보 파이프라인 연동 및 운영',
    stack: 'React, TypeScript, Vite, Python, FastAPI, Cloudflare Workers, Supabase, R2, alphaTab',
    image: 'project-madi-v015.jpg', imageAlt: '마디 v0.1.5 피아노 양손 악보 및 음표 편집 화면', imageNote: '현재 운영 중인 마디 v0.1.5의 실제 피아노 악보 편집 화면입니다.', url: 'https://madi.springcotton.com/',
    blocks: [
      ['WHY I BUILT IT', '음악을 듣는 곳에서, 연습하는 곳으로', '곡을 듣고 악보를 확인하고 필요한 부분을 고치는 일을 하나의 작업실에 모았습니다. 기타·베이스 TAB과 피아노 악보를 다루고, 그룹별로 곡을 정리해 원곡과 함께 연습할 수 있는 웹 앱입니다. 직접 사용하는 도구를 만들며 기획부터 개발·배포·운영까지 이어가고 있습니다.'],
      ['PLAY & EDIT', '악보와 소리가 함께 움직이는 편집 경험', '악보의 음높이·길이·운지를 수정하고 원곡·분리음·악보 미리듣기를 비교할 수 있도록 구현했습니다. 마디 단위 구간 반복, 실행 취소·다시 실행, 수정 이력, PDF·MusicXML·MIDI·프로젝트 ZIP 내보내기를 연결했습니다. 이미지 악보에는 코드 인식·수정·조옮김과 메모 기능을 더했습니다.'],
      ['AI WORKFLOW', '로컬 추론과 클라우드 작업실의 연결', 'MuScriptor 채보와 Demucs 음원 분리를 별도 Python 프로세스에서 처리하고, 웹 작업실은 Cloudflare Workers·Supabase·R2로 운영하는 구조를 구성했습니다. 무거운 모델 작업과 웹의 재생·편집·저장을 나누고, 완료된 결과를 이어서 다듬을 수 있도록 연결했습니다.'],
      ['MADE FOR PRACTICE', '실제 연주 환경에서 필요한 기능', 'PWA 설치와 모바일·태블릿 화면을 지원하고, 블루투스 키보드 모드 페달로 악보를 넘길 수 있도록 구현했습니다. 느린 연결에서의 음원 재생 유지, 악보 이미지 캐시와 다음 페이지 미리 받기, 수정 버전 비교를 통한 저장 충돌 처리도 보완했습니다.']
    ],
    scope: 'AI 채보는 사용자가 듣고 수정하는 초안으로 제공합니다. 새 채보 작업은 Mac 처리기가 연결되어 있어야 실행되며, 공개 웹 작업실의 악보 보기·재생·편집과 분리해 운영합니다.'
  }
];

const projectCards: Record<ProjectId, ProjectCardData> = {
  "sync": {
    "className": "project-sync",
    "id": null,
    "buttonLabel": "Sync Platform 프로젝트 자세히 보기",
    "visualLabel": "PLATFORM / OFFICIAL PRODUCT IMAGE",
    "number": "01 / DIGITAL DENTISTRY",
    "description": "치과와 기공소의 일상을 하나의 플랫폼으로.",
    "tags": [
      "REACT · TYPESCRIPT · NESTJS",
      "MEMBERSHIP / BILLING / CLOUD",
      "2022 — PRESENT"
    ],
    "screens": [
      {
        "src": "/assets/project-sync-official.jpg",
        "alt": "DOF Sync 공식 제품 이미지. 프로젝트 요청부터 치과 스캔 데이터 관리까지의 실제 제품 화면",
        "width": 950,
        "height": 590
      }
    ]
  },
  "systems": {
    "className": "project-systems",
    "id": null,
    "buttonLabel": "API and Data Systems 프로젝트 자세히 보기",
    "visualLabel": "ENGINEERING / SYSTEM STUDY",
    "number": "02 / BACKEND ENGINEERING",
    "description": "API의 경계와 데이터의 일관성을 설계하다.",
    "tags": [
      "NESTJS · MYSQL · MONGODB · AWS S3",
      "2026"
    ],
    "screens": [
      {
        "src": "/assets/project-systems.svg",
        "alt": "API, 캐시, 데이터베이스 간 흐름을 표현한 설계 개념도",
        "width": 900,
        "height": 1050
      }
    ]
  },
  "cross-platform": {
    "className": "project-mobile",
    "id": "sync-mobile",
    "buttonLabel": "DOF Sync Mobile 및 크로스플랫폼 프로젝트 자세히 보기",
    "visualLabel": "DOF SYNC MOBILE / APP STORE SCREENS",
    "number": "03 / WEB · MOBILE · DESKTOP",
    "description": "DOF Sync Mobile · 프로젝트를 모바일에서도.",
    "tags": [
      "REACT NATIVE · ELECTRON · THREE.JS",
      "2022 — 2024"
    ],
    "screens": [
      {
        "src": "/assets/dof-sync-mobile-board.png",
        "alt": "DOF Sync Mobile 공식 앱스토어 스크린샷: 프로젝트 대시보드",
        "width": 392,
        "height": 696
      },
      {
        "src": "/assets/dof-sync-mobile-viewer.png",
        "alt": "DOF Sync Mobile 공식 앱스토어 스크린샷: 3D 파일 뷰어",
        "width": 392,
        "height": 696
      }
    ],
    "link": {
      "url": "https://apps.apple.com/kr/app/dof-sync-mobile/id6451134757",
      "label": "VIEW ON APP STORE"
    }
  },
  "operations": {
    "className": "project-operations",
    "id": null,
    "buttonLabel": "Business and Operations 프로젝트 자세히 보기",
    "visualLabel": "BUSINESS LOGIC / OPERATIONS STUDY",
    "number": "04 / BUSINESS & OPERATIONS",
    "description": "업무의 맥락을 이해하고, 운영의 다음을 준비하다.",
    "tags": [
      "ERP · AWS · CI/CD · TEAM LEAD",
      "2014 — PRESENT"
    ],
    "screens": [
      {
        "src": "/assets/project-operations.svg",
        "alt": "업무 시스템에서 배포와 운영까지 이어지는 프로세스 개념도",
        "width": 1440,
        "height": 700
      }
    ]
  },
  "madi": {
    "className": "project-madi",
    "id": "madi",
    "buttonLabel": "마디 사이드 프로젝트 자세히 보기",
    "visualLabel": "MADI v0.1.5 / APP SCREENSHOT",
    "number": "05 / PERSONAL SIDE PROJECT",
    "description": "듣고, 고치고, 연주하세요. 음악 연습을 위한 나만의 작업실.",
    "tags": [
      "REACT · TYPESCRIPT · PYTHON",
      "CLOUDFLARE WORKERS · SUPABASE · R2",
      "2026.10 — PRESENT"
    ],
    "screens": [
      {
        "src": "/assets/project-madi-v015.jpg",
        "alt": "마디 v0.1.5의 실제 피아노 양손 악보·음표 편집·재생 화면",
        "width": 1280,
        "height": 720
      }
    ],
    "sideProject": true,
    "link": {
      "url": "https://madi.springcotton.com/",
      "label": "VISIT MADI"
    }
  }
};

export const projects: PortfolioProject[] = caseStudies.map(project => ({ ...project, card: projectCards[project.id] }));
