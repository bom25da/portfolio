# 권경원 · Kyungwon Kwon — Portfolio

화면부터 데이터와 운영까지 연결하는 풀스택 엔지니어 권경원의 개인 포트폴리오입니다.

[사이트 보기](https://springcotton.com/) · [GitHub](https://github.com/bom25da/portfolio) · [마디](https://madi.springcotton.com/)

## 소개

큰 타이포그래피와 밝고 어두운 섹션, 하나로 이어진 매듭을 중심으로 작업 경험을 소개합니다.

- **Selected Work**: Sync Platform, 백엔드 API·데이터 처리, DOF Sync Mobile, 업무 시스템·운영, 개인 프로젝트 마디의 다섯 가지 사례
- **About & Stack**: 경력과 분야별 기술 스택, 브랜드 색상을 유지한 기술 아이콘
- **Interaction**: 스크롤 텍스트 애니메이션, 프로젝트 상세 다이얼로그, 이전·다음 프로젝트 탐색, 이메일 복사
- **Accessibility**: 키보드 탐색, 본문 바로가기, 다이얼로그 포커스 복원, 동작 줄이기 설정 지원
- **Responsive & SEO**: 모바일·데스크톱 레이아웃, 정적 HTML 사전 렌더링, 검색·소셜 메타데이터, 사이트맵

`SELECTED WORK (05)`의 숫자는 프로젝트 데이터에서 계산한 작업 개수입니다.

## 기술 구성

| 용도 | 기술 |
| --- | --- |
| UI | React 19, TypeScript |
| 개발·번들링 | Vite 8, React Fast Refresh |
| 스타일·모션 | CSS, Intersection Observer, SVG |
| 타입 검사 | TypeScript strict 모드 |
| 배포 | 정적 HTML·JS·CSS, Sites 호스팅 |

이 저장소는 포트폴리오 웹사이트 소스입니다. 화면에 소개하는 NestJS·DB 등의 기술은 각 프로젝트의 경력 기술이며, 이 사이트 자체에 별도 API 서버나 DB는 없습니다.

## 로컬 실행

Node.js **22.12 이상**과 npm이 필요합니다. 현재 작업 환경은 Node.js 24입니다.

```sh
git clone https://github.com/bom25da/portfolio.git
cd portfolio
npm ci
npm run dev
```

개발 서버는 기본적으로 `http://127.0.0.1:5173`에서 실행됩니다. 현재 사이트 실행에는 환경변수나 API 키가 필요하지 않습니다.

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 로컬 개발 서버 실행 |
| `npm run typecheck` | TypeScript 타입 검사 |
| `npm run build` | 타입 검사 → 클라이언트 빌드 → HTML 사전 렌더링 |
| `npm run preview -- --port 4173` | 빌드한 사이트를 로컬에서 확인 |

```sh
npm run build
npm run preview -- --port 4173
```

빌드는 React 트리를 `dist/index.html`에 미리 렌더링하고 브라우저에서 같은 트리를 hydrate합니다. 배포 후 Node.js 서버를 계속 실행할 필요가 없습니다.

## 디렉터리 구조

```text
src/
├── App.tsx                 # 페이지 구성과 다이얼로그 상태
├── components/             # 섹션·프로젝트 카드·다이얼로그·공통 UI
├── data/
│   ├── projects.ts         # 프로젝트 본문·카드·이미지·외부 링크
│   └── technologies.ts     # 기술 그룹과 아이콘 경로
├── hooks/useScrollMotion.ts # 스크롤 애니메이션과 정리 로직
├── types/portfolio.ts      # 프로젝트·이미지·기술 스택 타입
├── styles.css              # 레이아웃·반응형·모션 스타일
├── main.tsx                # 브라우저 진입점
└── entry-server.tsx        # 빌드 시 HTML 렌더링 진입점
public/
├── assets/                 # 프로젝트 이미지·매듭·폰트·기술 아이콘
├── favicon.ico
├── _headers                # 정적 호스팅용 보안·캐시 헤더
├── robots.txt
└── sitemap.xml
scripts/
├── build.mjs               # Vite 빌드와 HTML 사전 렌더링
├── generate-assets.py       # 개념도 SVG 생성
├── knot_art.py              # 3D 매듭과 2D 마크 SVG 생성
└── render-knot-previews.cjs  # 매듭 PNG·파비콘·검토 이미지 생성
index.html                  # HTML 템플릿·검색·소셜 메타데이터
.openai/hosting.json         # Sites 프로젝트 연결·정적 배포 경로
```

`dist/`와 `.sites-runtime/`은 생성되는 파일이며 Git에서 제외합니다.

## 콘텐츠 수정

| 수정 대상 | 위치 |
| --- | --- |
| 프로젝트 설명·역할·기간·이미지 | `src/data/projects.ts` |
| 프로젝트 ID·데이터 구조 | `src/types/portfolio.ts` |
| 기술 스택·아이콘 | `src/data/technologies.ts`, `public/assets/icons/` |
| 자기소개·경력 | `src/components/About.tsx` |
| 메인 문구·소개 문구 | `src/components/Hero.tsx`, `src/components/Statement.tsx` |
| 연락처 | `src/components/Contact.tsx`, `src/components/MenuDialog.tsx` |
| 색상·여백·모바일 레이아웃 | `src/styles.css` |
| 제목·설명·공유 이미지·구조화 데이터 | `index.html` |

프로젝트를 추가할 때는 프로젝트 데이터와 ID 타입, `src/components/Work.tsx`의 카드 배치를 함께 수정합니다. 이미지는 `public/assets/`에 두고 브라우저에서는 `/assets/파일명`으로 참조합니다.

기존 매듭·파비콘은 저장소에 포함되어 있어 일반 실행·빌드 시 재생성이 필요하지 않습니다. 디자인을 변경할 때만 Python 3으로 `scripts/knot_art.py`를 실행한 뒤, 별도로 설치한 `sharp`를 사용해 `scripts/render-knot-previews.cjs`를 실행합니다. 렌더러의 첫 번째 인자는 `sharp`가 설치된 `node_modules` 경로, 두 번째 인자는 검토 이미지 출력 경로입니다.

## 배포

현재 공개 주소는 [springcotton.com](https://springcotton.com/)이며 Sites에서 정적 파일을 제공합니다. `.openai/hosting.json`은 프로젝트 식별자와 출력 경로만 포함하며 인증 키를 저장하지 않습니다.

1. `npm ci`로 의존성을 설치합니다.
2. `npm run build`로 타입 검사와 정적 빌드를 완료합니다.
3. `npm run preview`로 변경 사항을 확인합니다.
4. Sites에 빌드 결과인 `dist/`를 배포합니다.

다른 정적 호스팅에서도 `dist/`를 배포할 수 있습니다. 호스팅을 옮길 때는 `_headers` 지원 여부와 도메인, `index.html`·`robots.txt`·`sitemap.xml`의 URL을 확인합니다. GitHub에 push하는 작업과 사이트를 배포하는 작업은 별개입니다.

## 공개 파일 관리

브라우저로 배포되는 소스와 `public/`의 파일은 방문자가 읽을 수 있습니다. 환경변수 파일·인증서·개인키·로그·로컬 배포 파일은 `.gitignore`로 제외하며, 이력서 원본이나 비공개 업무 자료는 저장소 밖에서 관리합니다. `VITE_` 접두사가 붙은 환경변수도 클라이언트 코드에서 사용하면 공개되므로 비밀 값을 넣지 않습니다.

커밋 이력은 [Gitleaks](https://github.com/gitleaks/gitleaks) 설치 후 다음과 같이 검사할 수 있습니다. 출력에 비밀 값이 표시되지 않도록 redaction 옵션을 사용합니다.

```sh
gitleaks git . --log-opts=--all --redact=100
```

## 이미지·폰트 출처

| 자산 | 출처·권리 |
| --- | --- |
| Sync 제품 이미지 | [DOF 공식 소개 페이지](https://doflab.com/en/software/sync), © DOF |
| DOF Sync Mobile 화면 2종 | [공식 App Store](https://apps.apple.com/kr/app/dof-sync-mobile/id6451134757), © DOF |
| 마디 화면 | 직접 제작·운영하는 [마디](https://madi.springcotton.com/)의 실제 앱 캡처 |
| 매듭·파비콘·업무 개념도 | 저장소의 생성 스크립트로 제작 |
| Barlow Condensed | SIL Open Font License, `public/assets/OFL-Barlow.txt` |
| IBM Plex Mono | SIL Open Font License, `public/assets/OFL-IBM-Plex-Mono.txt` |
| 기술 아이콘 | [Devicon v2.17.0](https://github.com/devicons/devicon/tree/v2.17.0), MIT, `public/assets/icons/LICENSE` |

Sync Mobile은 2026-11-09에 받은 공식 Main board·3D File Viewer 이미지이며, 마디는 같은 날 v0.1.5 피아노 편집 화면을 캡처했습니다. 그 외 프로젝트 시각 자료는 실제 제품 화면이 아닌 개념도임을 사이트에 표시합니다. 외부 제품 이미지와 상표의 권리는 각 권리자에게 있습니다.
