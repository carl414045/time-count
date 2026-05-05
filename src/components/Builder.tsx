import { useState, useEffect } from "react";
import { Countdown, CountdownProps } from "./Countdown";
import { Copy, Check, Info, Palette, Clock, TerminalSquare } from "lucide-react";

export function Builder() {
  const [datePart, setDatePart] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
  const [hourPart, setHourPart] = useState("23");
  const [minutePart, setMinutePart] = useState("59");

  const targetDate = `${datePart}T${hourPart}:${minutePart}:00`;
  
  const [title, setTitle] = useState("令人期待的產品發佈");
  const [theme, setTheme] = useState<CountdownProps["theme"]>("light");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");

  const [embedWidth, setEmbedWidth] = useState("800");
  const [embedHeight, setEmbedHeight] = useState("300");
  const [isResponsiveWidth, setIsResponsiveWidth] = useState(true);
  const [showSeconds, setShowSeconds] = useState(true);
  
  const [titleSize, setTitleSize] = useState("18");
  const [numberSize, setNumberSize] = useState("36");
  const [labelSize, setLabelSize] = useState("10");
  const [fontFamily, setFontFamily] = useState("'Inter', sans-serif");
  const [titleFontFamily, setTitleFontFamily] = useState("'Inter', sans-serif");
  const [titleGap, setTitleGap] = useState("32");
  const [timeGap, setTimeGap] = useState("24");
  const [blockPadding, setBlockPadding] = useState("16");

  const [embedCode, setEmbedCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate embed URL
    const baseUrl = window.location.href.split('?')[0].split('#')[0];
    const url = new URL(baseUrl);
    url.searchParams.set("embed", "true");
    url.searchParams.set("target", new Date(targetDate).toISOString());
    if (title) url.searchParams.set("title", title);
    url.searchParams.set("theme", theme);
    if (theme === "custom" || theme === "transparent") {
      url.searchParams.set("text", textColor);
      if (theme === "custom") {
        url.searchParams.set("bg", bgColor);
      }
    }
    url.searchParams.set("showSeconds", showSeconds.toString());
    if (titleSize) url.searchParams.set("titleSize", titleSize);
    if (numberSize) url.searchParams.set("numberSize", numberSize);
    if (labelSize) url.searchParams.set("labelSize", labelSize);
    if (fontFamily) url.searchParams.set("fontFamily", fontFamily);
    if (titleFontFamily) url.searchParams.set("titleFontFamily", titleFontFamily);
    if (titleGap) url.searchParams.set("titleGap", titleGap);
    if (timeGap) url.searchParams.set("timeGap", timeGap);
    if (blockPadding) url.searchParams.set("blockPadding", blockPadding);
    
    const finalWidth = isResponsiveWidth ? "100%" : `${embedWidth}px`;
    const code = `<iframe src="${url.toString()}" width="${finalWidth}" height="${embedHeight}px" style="border:none; border-radius: 12px; overflow:hidden;" allowtransparency="true"></iframe>`;
    setEmbedCode(code);
  }, [targetDate, title, theme, bgColor, textColor, embedWidth, embedHeight, showSeconds, titleSize, numberSize, labelSize, fontFamily, titleFontFamily, isResponsiveWidth, titleGap, timeGap, blockPadding]);

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Settings */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">倒數計時器產生器</h1>
            <p className="text-neutral-500">
              建立自訂倒數計時器，並將其內嵌到您的網站中。
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 space-y-6">
            
            {/* Content Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Clock className="w-5 h-5 text-neutral-400" /> 日期與時間
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    活動標題
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="例如：夏季特賣倒數"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    目標日期與時間 (24小時制)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={datePart}
                      onChange={(e) => setDatePart(e.target.value)}
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <select
                      value={hourPart}
                      onChange={(e) => setHourPart(e.target.value)}
                      className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {Array.from({ length: 24 }).map((_, i) => (
                        <option key={i} value={String(i).padStart(2, "0")}>
                          {String(i).padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                    <span className="flex items-center text-neutral-500 font-bold">:</span>
                    <select
                      value={minutePart}
                      onChange={(e) => setMinutePart(e.target.value)}
                      className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {Array.from({ length: 60 }).map((_, i) => (
                        <option key={i} value={String(i).padStart(2, "0")}>
                          {String(i).padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="showSeconds"
                    checked={showSeconds}
                    onChange={(e) => setShowSeconds(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="showSeconds" className="text-sm font-medium text-neutral-700">
                    顯示秒數
                  </label>
                </div>
              </div>
            </div>

            <hr className="border-neutral-100" />

            {/* Appearance Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Palette className="w-5 h-5 text-neutral-400" /> 外觀設定
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    主題預設
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(["light", "dark", "transparent", "custom"] as const).map((t) => {
                      const displayNames = {
                        light: "淺色",
                        dark: "深色",
                        transparent: "透明",
                        custom: "自訂",
                      };
                      return (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`py-2 px-3 text-sm font-medium rounded-lg capitalize transition-all border ${
                          theme === t
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
                        }`}
                      >
                        {displayNames[t]}
                      </button>
                    )})}
                  </div>
                </div>

                {(theme === "custom" || theme === "transparent") && (
                  <div className="grid grid-cols-2 gap-4 mt-3 p-4 bg-neutral-50 rounded-lg border border-neutral-100 animate-in fade-in slide-in-from-top-2">
                    {theme === "custom" ? (
                      <div>
                        <label className="block text-xs font-medium text-neutral-500 mb-1 uppercase tracking-wider">
                          背景顏色
                        </label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                          />
                          <input
                            type="text"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="w-full text-sm px-2 py-1 border border-neutral-300 rounded font-mono"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center text-xs text-neutral-500 italic mt-4">
                        背景將會是透明的
                      </div>
                    )}
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1 uppercase tracking-wider">
                        文字顏色
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                        />
                        <input
                          type="text"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-full text-sm px-2 py-1 border border-neutral-300 rounded font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-neutral-100">
                  <h4 className="text-sm font-medium text-neutral-700 mb-3">標題排版設定</h4>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1">字體 (Google Fonts)</label>
                      <select
                        value={titleFontFamily}
                        onChange={(e) => setTitleFontFamily(e.target.value)}
                        className="w-full text-sm px-2 py-1.5 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="'Inter', sans-serif">Inter</option>
                        <option value="'Noto Sans TC', sans-serif">思源黑體 (Noto Sans TC)</option>
                        <option value="'Noto Serif TC', serif">思源宋體 (Noto Serif TC)</option>
                        <option value="'Roboto', sans-serif">Roboto</option>
                        <option value="'Playfair Display', serif">Playfair Display</option>
                        <option value="'Space Grotesk', sans-serif">Space Grotesk</option>
                        <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1">字體大小</label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={titleSize}
                          onChange={(e) => setTitleSize(e.target.value)}
                          className="w-full text-sm px-2 py-1.5 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="18"
                        />
                        <span className="text-xs text-neutral-500 shrink-0">pt</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-sm font-medium text-neutral-700 mb-3 pt-4 border-t border-neutral-50">時間排版設定</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="col-span-2 sm:col-span-1 border-b sm:border-b-0 sm:border-r border-neutral-100 pb-3 sm:pb-0 sm:pr-3">
                      <label className="block text-xs text-neutral-500 mb-1">字體 (Google Fonts)</label>
                      <select
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                        className="w-full text-sm px-2 py-1.5 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="'Inter', sans-serif">Inter</option>
                        <option value="'Noto Sans TC', sans-serif">思源黑體 (Noto Sans TC)</option>
                        <option value="'Noto Serif TC', serif">思源宋體 (Noto Serif TC)</option>
                        <option value="'Roboto', sans-serif">Roboto</option>
                        <option value="'Playfair Display', serif">Playfair Display</option>
                        <option value="'Space Grotesk', sans-serif">Space Grotesk</option>
                        <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
                      </select>
                    </div>
                    <div className="col-span-1 sm:pl-1">
                      <label className="block text-xs text-neutral-500 mb-1">數字大小</label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={numberSize}
                          onChange={(e) => setNumberSize(e.target.value)}
                          className="w-full text-sm px-2 py-1.5 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="36"
                        />
                        <span className="text-xs text-neutral-500 shrink-0">pt</span>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <label className="block text-xs text-neutral-500 mb-1">單位大小</label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={labelSize}
                          onChange={(e) => setLabelSize(e.target.value)}
                          className="w-full text-sm px-2 py-1.5 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="10"
                        />
                        <span className="text-xs text-neutral-500 shrink-0">pt</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-sm font-medium text-neutral-700 mb-3 pt-4 border-t border-neutral-50">間距設定</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1">標題與時間間距</label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={titleGap}
                          onChange={(e) => setTitleGap(e.target.value)}
                          className="w-full text-sm px-2 py-1.5 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="32"
                        />
                        <span className="text-xs text-neutral-500 shrink-0">px</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1">時間區塊間距</label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={timeGap}
                          onChange={(e) => setTimeGap(e.target.value)}
                          className="w-full text-sm px-2 py-1.5 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="24"
                        />
                        <span className="text-xs text-neutral-500 shrink-0">px</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1">時間框內留白</label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={blockPadding}
                          onChange={(e) => setBlockPadding(e.target.value)}
                          className="w-full text-sm px-2 py-1.5 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="16"
                        />
                        <span className="text-xs text-neutral-500 shrink-0">px</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-neutral-100" />

            {/* Embed Code */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <TerminalSquare className="w-5 h-5 text-neutral-400" /> 內嵌程式碼
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-neutral-700">
                      寬度
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-neutral-500 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isResponsiveWidth} 
                        onChange={(e) => setIsResponsiveWidth(e.target.checked)}
                        className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500 w-3 h-3" 
                      />
                      自適應(100%)
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={isResponsiveWidth ? 100 : embedWidth}
                      onChange={(e) => {
                        if (!isResponsiveWidth) {
                          setEmbedWidth(e.target.value);
                        }
                      }}
                      disabled={isResponsiveWidth}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-neutral-100 disabled:text-neutral-400"
                      placeholder="800"
                    />
                    <span className="text-sm text-neutral-500 font-medium w-6 shrink-0 text-center">
                      {isResponsiveWidth ? "%" : "px"}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    高度
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={embedHeight}
                      onChange={(e) => setEmbedHeight(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="300"
                    />
                    <span className="text-sm text-neutral-500 font-medium w-6 shrink-0 text-center">px</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-800 rounded-lg p-1 overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-700">
                  <span className="text-xs text-neutral-400 font-mono">HTML</span>
                  <button
                    onClick={handleCopy}
                    className="text-xs flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "已複製！" : "複製程式碼"}
                  </button>
                </div>
                <div className="p-3 overflow-x-auto">
                  <pre className="text-sm font-mono text-neutral-300 whitespace-pre-wrap word-break-all">
                    {embedCode}
                  </pre>
                </div>
              </div>
              <p className="text-xs text-neutral-500 flex gap-1.5 items-start">
                <Info className="w-4 h-4 flex-shrink-0" />
                複製此程式碼並將其貼到您的網站原始碼中以顯示計時器。完美適用於 WordPress, Webflow 等各大架站平台。
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="sticky top-10 space-y-4">
            <h3 className="text-lg font-medium px-1 text-neutral-700">即時預覽</h3>
            <div className="w-full rounded-2xl shadow-inner border border-neutral-200/50 bg-neutral-200/50 flex items-center justify-center overflow-auto p-4 sm:p-8 min-h-[400px]">
              <div 
                className="relative bg-white shadow-xl ring-1 ring-black/5 transition-all duration-300"
                style={{ 
                  width: isResponsiveWidth ? '100%' : `${embedWidth}px`, 
                  height: embedHeight ? `${embedHeight}px` : '300px',
                  borderRadius: "12px",
                  overflow: "hidden"
                }}
              >
                {theme === "transparent" && (
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                )}
                <div className="absolute inset-0 z-10 flex">
                  <Countdown
                    targetDate={targetDate}
                    title={title}
                    theme={theme}
                    backgroundColor={bgColor}
                    textColor={textColor}
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
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
