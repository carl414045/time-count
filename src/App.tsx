/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Builder } from './components/Builder';
import { Countdown } from './components/Countdown';

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const isEmbed = params.get('embed') === 'true';

  if (isEmbed) {
    const targetDate = params.get('target');
    const title = params.get('title') || undefined;
    const theme = (params.get('theme') as "light" | "dark" | "custom" | "transparent") || "light";
    const bg = params.get('bg') || undefined;
    const text = params.get('text') || undefined;
    const showSeconds = params.get('showSeconds') !== 'false';
    const titleSize = params.get('titleSize') || undefined;
    const numberSize = params.get('numberSize') || undefined;
    const labelSize = params.get('labelSize') || undefined;
    const fontFamily = params.get('fontFamily') || undefined;
    const titleFontFamily = params.get('titleFontFamily') || undefined;

    const titleGap = params.get('titleGap') || undefined;
    const timeGap = params.get('timeGap') || undefined;
    const blockPadding = params.get('blockPadding') || undefined;

    if (!targetDate) {
      return (
        <div className="flex items-center justify-center h-screen bg-neutral-100 text-neutral-500 font-sans">
          Missing target date configuration.
        </div>
      );
    }

    return (
      <div className="w-screen h-screen m-0 p-0 overflow-hidden">
        <Countdown
          targetDate={targetDate}
          title={title}
          theme={theme}
          backgroundColor={bg}
          textColor={text}
          showSeconds={showSeconds}
          titleSize={titleSize}
          numberSize={numberSize}
          labelSize={labelSize}
          fontFamily={fontFamily}
          titleFontFamily={titleFontFamily}
          titleGap={titleGap}
          timeGap={timeGap}
          blockPadding={blockPadding}
        />
      </div>
    );
  }

  return <Builder />;
}
