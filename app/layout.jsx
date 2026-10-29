import '../source/library.css';

export const metadata = {
  title: 'Tayan广告策划与风扇素材总览 · 16个方向 · 48条完整口播',
  description: '风扇视频素材库：原视频、发布文案、中文字幕、抽帧对照与广告脚本。',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
