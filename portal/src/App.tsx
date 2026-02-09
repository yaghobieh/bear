import { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BearLoader } from './components/BearLoader';
import { Topbar } from './components/Topbar/Topbar';
import { Sidebar } from './components/Sidebar';

// Banner configuration — promote ForgeStack CLI
const BANNER_CONFIG = {
  id: 'forge-cli-launch',
  message: '🚀 New ForgeStack CLI is here! Create React projects with Bear, Compass, Synapse & more in seconds.',
  link: 'https://www.npmjs.com/package/@forgedevstack/cli',
  linkText: 'Try npx @forgedevstack/cli →',
};

// Lazy load pages - Getting Started
const IntroductionPage = lazy(() => import('./pages/Introduction'));
const InstallationPage = lazy(() => import('./pages/Installation'));
const ThemingPage = lazy(() => import('./pages/Theming'));
const TypeScriptPage = lazy(() => import('./pages/TypeScript'));

// Layout Components
const ContainerPage = lazy(() => import('./pages/components/Container'));
const GridPage = lazy(() => import('./pages/components/Grid'));
const FlexPage = lazy(() => import('./pages/components/Flex'));
const PaperPage = lazy(() => import('./pages/components/Paper'));
const DividerPage = lazy(() => import('./pages/components/Divider'));

// Input Components
const ButtonPage = lazy(() => import('./pages/components/Button'));
const ButtonGroupPage = lazy(() => import('./pages/components/ButtonGroup'));
const FabPage = lazy(() => import('./pages/components/Fab'));
const InputPage = lazy(() => import('./pages/components/Input'));
const SelectPage = lazy(() => import('./pages/components/Select'));
const CheckboxPage = lazy(() => import('./pages/components/Checkbox'));
const RadioPage = lazy(() => import('./pages/components/Radio'));
const SwitchPage = lazy(() => import('./pages/components/Switch'));
const RatingPage = lazy(() => import('./pages/components/Rating'));
const AutocompletePage = lazy(() => import('./pages/components/Autocomplete'));
const MultiSelectPage = lazy(() => import('./pages/components/MultiSelect'));
const TransferListPage = lazy(() => import('./pages/components/TransferList'));

// Data Display Components
const TypographyPage = lazy(() => import('./pages/components/Typography'));
const AvatarPage = lazy(() => import('./pages/components/Avatar'));
const BadgePage = lazy(() => import('./pages/components/Badge'));
const CardPage = lazy(() => import('./pages/components/Card'));
const ListPage = lazy(() => import('./pages/components/List'));
const DataTablePage = lazy(() => import('./pages/components/DataTable'));
const TooltipPage = lazy(() => import('./pages/components/Tooltip'));
const CarouselPage = lazy(() => import('./pages/components/Carousel'));

// Feedback Components
const AlertPage = lazy(() => import('./pages/components/Alert'));
const ToastPage = lazy(() => import('./pages/components/Toast'));
const SkeletonPage = lazy(() => import('./pages/components/Skeleton'));
const SpinnerPage = lazy(() => import('./pages/components/Spinner'));
const ProgressPage = lazy(() => import('./pages/components/Progress'));
const BearLoaderPage = lazy(() => import('./pages/components/BearLoaderPage'));
const ModalPage = lazy(() => import('./pages/components/Modal'));
const DrawerPage = lazy(() => import('./pages/components/Drawer'));

// New Components
const SliderPage = lazy(() => import('./pages/components/Slider'));
const PaginationPage = lazy(() => import('./pages/components/Pagination'));

// Date & Time Components
const CalendarPage = lazy(() => import('./pages/components/Calendar'));
const DatePickerPage = lazy(() => import('./pages/components/DatePicker'));
const TimePickerPage = lazy(() => import('./pages/components/TimePicker'));
const PhoneInputPage = lazy(() => import('./pages/components/PhoneInput'));
const CreditInputPage = lazy(() => import('./pages/components/CreditInput'));
const CascaderPage = lazy(() => import('./pages/components/Cascader'));
const FormPage = lazy(() => import('./pages/components/Form'));
const NotificationCenterPage = lazy(() => import('./pages/components/NotificationCenter'));
const CommandPalettePage = lazy(() => import('./pages/components/CommandPalette'));

// Navigation Components (Additional)
const BreadcrumbsPage = lazy(() => import('./pages/components/Breadcrumbs'));
const StepperPage = lazy(() => import('./pages/components/Stepper'));
const AppBarPage = lazy(() => import('./pages/components/AppBar'));
const BottomNavigationPage = lazy(() => import('./pages/components/BottomNavigation'));

// Advanced Components
const PopoverPage = lazy(() => import('./pages/components/Popover'));
const ChipPage = lazy(() => import('./pages/components/Chip'));
const TreeViewPage = lazy(() => import('./pages/components/TreeView'));
const TimelinePage = lazy(() => import('./pages/components/Timeline'));
const FileUploadPage = lazy(() => import('./pages/components/FileUpload'));
const NumberInputPage = lazy(() => import('./pages/components/NumberInput'));
const OTPInputPage = lazy(() => import('./pages/components/OTPInput'));
const ColorPickerPage = lazy(() => import('./pages/components/ColorPicker'));
const StatisticPage = lazy(() => import('./pages/components/Statistic'));
const EmptyStatePage = lazy(() => import('./pages/components/EmptyState'));
const ImagePage = lazy(() => import('./pages/components/Image'));
const ScrollAreaPage = lazy(() => import('./pages/components/ScrollArea'));
const CollapsiblePage = lazy(() => import('./pages/components/Collapsible'));
const SidebarPage = lazy(() => import('./pages/components/Sidebar'));
const ColumnsPage = lazy(() => import('./pages/components/Columns'));
const KbdPage = lazy(() => import('./pages/components/Kbd'));
const CopyButtonPage = lazy(() => import('./pages/components/CopyButton'));

// New Components
const BoxPage = lazy(() => import('./pages/components/Box'));
const EmPage = lazy(() => import('./pages/components/Em'));
const HighlightPage = lazy(() => import('./pages/components/Highlight'));
const MarkPage = lazy(() => import('./pages/components/Mark'));
const CodeBlockPage = lazy(() => import('./pages/components/CodeBlockPage'));
const HoverCardPage = lazy(() => import('./pages/components/HoverCard'));
const EditablePage = lazy(() => import('./pages/components/Editable'));
const ActiveBarPage = lazy(() => import('./pages/components/ActiveBar'));
const RichEditorPage = lazy(() => import('./pages/components/RichEditor'));
const SignPadPage = lazy(() => import('./pages/components/SignPad'));

// Navigation Components
const LinkPage = lazy(() => import('./pages/components/Link'));
const TabsPage = lazy(() => import('./pages/components/Tabs'));
const AccordionPage = lazy(() => import('./pages/components/Accordion'));
const MenuPage = lazy(() => import('./pages/components/Menu'));
const DropdownPage = lazy(() => import('./pages/components/Dropdown'));
const SpeedDialPage = lazy(() => import('./pages/components/SpeedDial'));

// Charts & Graphs
const ChartPage = lazy(() => import('./pages/components/Chart'));
const SparklinePage = lazy(() => import('./pages/components/Sparkline'));
const GaugePage = lazy(() => import('./pages/components/Gauge'));

// Animation Hooks
const UseSlidePage = lazy(() => import('./pages/hooks/UseSlide'));
const UseParallaxPage = lazy(() => import('./pages/hooks/UseParallax'));
const UseBouncePage = lazy(() => import('./pages/hooks/UseBounce'));
const UseFloatPage = lazy(() => import('./pages/hooks/UseFloat'));
const UsePulsePage = lazy(() => import('./pages/hooks/UsePulse'));
const UseShakePage = lazy(() => import('./pages/hooks/UseShake'));

// Utility Hooks
const UseClipboardPage = lazy(() => import('./pages/hooks/UseClipboard'));
const UseDebouncePage = lazy(() => import('./pages/hooks/UseDebounce'));
const UseThrottlePage = lazy(() => import('./pages/hooks/UseThrottle'));
const UseLocalStoragePage = lazy(() => import('./pages/hooks/UseLocalStorage'));
const UseKeyPressPage = lazy(() => import('./pages/hooks/UseKeyPress'));
const UseIntersectionObserverPage = lazy(() => import('./pages/hooks/UseIntersectionObserver'));
const UseDragDropPage = lazy(() => import('./pages/hooks/UseDragDrop'));
const UseLazyLoadPage = lazy(() => import('./pages/hooks/UseLazyLoad'));

// New v1.0.9 Hooks
const UseOnlinePage = lazy(() => import('./pages/hooks/UseOnline'));
const UseIdlePage = lazy(() => import('./pages/hooks/UseIdle'));
const UseLongPressPage = lazy(() => import('./pages/hooks/UseLongPress'));
const UseWebSocketPage = lazy(() => import('./pages/hooks/UseWebSocket'));
const UsePageVisibilityPage = lazy(() => import('./pages/hooks/UsePageVisibility'));

// New v1.0.7 Components
const SegmentedControlPage = lazy(() => import('./pages/components/SegmentedControl'));
const TagsInputPage = lazy(() => import('./pages/components/TagsInput'));
const BottomSheetPage = lazy(() => import('./pages/components/BottomSheet'));
const SliderRangePage = lazy(() => import('./pages/components/SliderRange'));
const MentionsInputPage = lazy(() => import('./pages/components/MentionsInput'));
const KanbanPage = lazy(() => import('./pages/components/Kanban'));
const EmojiPickerPage = lazy(() => import('./pages/components/EmojiPicker'));
const VirtualListPage = lazy(() => import('./pages/components/VirtualList'));

// New v1.0.8 Components
const BackTopPage = lazy(() => import('./pages/components/BackTop'));
const ConfettiPage = lazy(() => import('./pages/components/Confetti'));
const TourPage = lazy(() => import('./pages/components/Tour'));
const QRCodePage = lazy(() => import('./pages/components/QRCode'));

// New v1.0.9 Components
const JsonViewerPage = lazy(() => import('./pages/components/JsonViewer'));
const DiffViewerPage = lazy(() => import('./pages/components/DiffViewer'));
const ChatPage = lazy(() => import('./pages/components/ChatPage'));
const FloatingChatPage = lazy(() => import('./pages/components/FloatingChatPage'));
const TerminalPage = lazy(() => import('./pages/components/TerminalPage'));

// Utilities
const IconsPage = lazy(() => import('./pages/Icons'));
const HooksPage = lazy(() => import('./pages/Hooks'));
const RoadmapPage = lazy(() => import('./pages/Roadmap'));
const TemplatesPage = lazy(() => import('./pages/Templates'));

// Fallback for lazy loading
const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-bear-500 border-t-transparent" />
  </div>
);

// Height constants
const TOPBAR_HEIGHT = 64; // h-16 = 64px
const BANNER_HEIGHT = 40; // py-2 + content = ~40px

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  // Calculate top offset based on banner visibility
  const topOffset = TOPBAR_HEIGHT + (bannerVisible ? BANNER_HEIGHT : 0);

  // Show loader on initial load
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('bear-portal-loaded');
    if (hasLoaded) {
      setIsLoading(false);
    }
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('bear-portal-loaded', 'true');
  };

  const handleBannerVisibilityChange = useCallback((visible: boolean) => {
    setBannerVisible(visible);
  }, []);

  if (isLoading) {
    return <BearLoader onComplete={handleLoaderComplete} duration={2000} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        banner={BANNER_CONFIG}
        onBannerVisibilityChange={handleBannerVisibilityChange}
      />

      <div 
        className="flex"
        style={{ paddingTop: `${topOffset}px` }}
      >
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          topOffset={topOffset}
        />

        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<IntroductionPage />} />
                <Route path="/installation" element={<InstallationPage />} />
                <Route path="/theming" element={<ThemingPage />} />
                <Route path="/typescript" element={<TypeScriptPage />} />
                
                <Route path="/components/container" element={<ContainerPage />} />
                <Route path="/components/grid" element={<GridPage />} />
                <Route path="/components/flex" element={<FlexPage />} />
                <Route path="/components/paper" element={<PaperPage />} />
                <Route path="/components/divider" element={<DividerPage />} />
                
                <Route path="/components/button" element={<ButtonPage />} />
                <Route path="/components/button-group" element={<ButtonGroupPage />} />
                <Route path="/components/fab" element={<FabPage />} />
                <Route path="/components/input" element={<InputPage />} />
                <Route path="/components/select" element={<SelectPage />} />
                <Route path="/components/checkbox" element={<CheckboxPage />} />
                <Route path="/components/radio" element={<RadioPage />} />
                <Route path="/components/switch" element={<SwitchPage />} />
                <Route path="/components/slider" element={<SliderPage />} />
                <Route path="/components/rating" element={<RatingPage />} />
                <Route path="/components/autocomplete" element={<AutocompletePage />} />
                <Route path="/components/multi-select" element={<MultiSelectPage />} />
                <Route path="/components/transfer-list" element={<TransferListPage />} />
                
                <Route path="/components/typography" element={<TypographyPage />} />
                <Route path="/components/avatar" element={<AvatarPage />} />
                <Route path="/components/badge" element={<BadgePage />} />
                <Route path="/components/card" element={<CardPage />} />
                <Route path="/components/list" element={<ListPage />} />
                <Route path="/components/data-table" element={<DataTablePage />} />
                <Route path="/components/tooltip" element={<TooltipPage />} />
                <Route path="/components/carousel" element={<CarouselPage />} />
                <Route path="/components/pagination" element={<PaginationPage />} />
                
                <Route path="/components/alert" element={<AlertPage />} />
                <Route path="/components/toast" element={<ToastPage />} />
                <Route path="/components/skeleton" element={<SkeletonPage />} />
                <Route path="/components/spinner" element={<SpinnerPage />} />
                <Route path="/components/progress" element={<ProgressPage />} />
                <Route path="/components/bear-loader" element={<BearLoaderPage />} />
                <Route path="/components/modal" element={<ModalPage />} />
                <Route path="/components/drawer" element={<DrawerPage />} />
                
                <Route path="/components/link" element={<LinkPage />} />
                <Route path="/components/tabs" element={<TabsPage />} />
                <Route path="/components/accordion" element={<AccordionPage />} />
                <Route path="/components/menu" element={<MenuPage />} />
                <Route path="/components/dropdown" element={<DropdownPage />} />
                <Route path="/components/speed-dial" element={<SpeedDialPage />} />
                <Route path="/components/breadcrumbs" element={<BreadcrumbsPage />} />
                <Route path="/components/stepper" element={<StepperPage />} />
                <Route path="/components/app-bar" element={<AppBarPage />} />
                <Route path="/components/bottom-navigation" element={<BottomNavigationPage />} />
                
                <Route path="/components/calendar" element={<CalendarPage />} />
                <Route path="/components/date-picker" element={<DatePickerPage />} />
                <Route path="/components/time-picker" element={<TimePickerPage />} />
                <Route path="/components/phone-input" element={<PhoneInputPage />} />
                <Route path="/components/credit-input" element={<CreditInputPage />} />
                <Route path="/components/cascader" element={<CascaderPage />} />
                <Route path="/components/form" element={<FormPage />} />
                <Route path="/components/notification-center" element={<NotificationCenterPage />} />
                <Route path="/components/command-palette" element={<CommandPalettePage />} />
                
                <Route path="/components/popover" element={<PopoverPage />} />
                <Route path="/components/chip" element={<ChipPage />} />
                <Route path="/components/tree-view" element={<TreeViewPage />} />
                <Route path="/components/timeline" element={<TimelinePage />} />
                <Route path="/components/file-upload" element={<FileUploadPage />} />
                <Route path="/components/number-input" element={<NumberInputPage />} />
                <Route path="/components/otp-input" element={<OTPInputPage />} />
                <Route path="/components/color-picker" element={<ColorPickerPage />} />
                <Route path="/components/statistic" element={<StatisticPage />} />
                <Route path="/components/empty-state" element={<EmptyStatePage />} />
                <Route path="/components/image" element={<ImagePage />} />
                <Route path="/components/scroll-area" element={<ScrollAreaPage />} />
                <Route path="/components/collapsible" element={<CollapsiblePage />} />
                <Route path="/components/kbd" element={<KbdPage />} />
                <Route path="/components/copy-button" element={<CopyButtonPage />} />
                <Route path="/components/sidebar" element={<SidebarPage />} />
                <Route path="/components/columns" element={<ColumnsPage />} />
                <Route path="/components/box" element={<BoxPage />} />
                <Route path="/components/em" element={<EmPage />} />
                <Route path="/components/highlight" element={<HighlightPage />} />
                <Route path="/components/mark" element={<MarkPage />} />
                <Route path="/components/code-block" element={<CodeBlockPage />} />
                <Route path="/components/hover-card" element={<HoverCardPage />} />
                <Route path="/components/editable" element={<EditablePage />} />
                <Route path="/components/active-bar" element={<ActiveBarPage />} />
                <Route path="/components/rich-editor" element={<RichEditorPage />} />
                <Route path="/components/sign-pad" element={<SignPadPage />} />
                <Route path="/components/segmented-control" element={<SegmentedControlPage />} />
                <Route path="/components/tags-input" element={<TagsInputPage />} />
                <Route path="/components/bottom-sheet" element={<BottomSheetPage />} />
                <Route path="/components/slider-range" element={<SliderRangePage />} />
                <Route path="/components/mentions-input" element={<MentionsInputPage />} />
                <Route path="/components/kanban" element={<KanbanPage />} />
                <Route path="/components/emoji-picker" element={<EmojiPickerPage />} />
                <Route path="/components/virtual-list" element={<VirtualListPage />} />
                
                {/* v1.0.8 Components */}
                <Route path="/components/back-top" element={<BackTopPage />} />
                <Route path="/components/confetti" element={<ConfettiPage />} />
                <Route path="/components/tour" element={<TourPage />} />
                <Route path="/components/qr-code" element={<QRCodePage />} />
                
                {/* v1.0.9 Components */}
                <Route path="/components/json-viewer" element={<JsonViewerPage />} />
                <Route path="/components/diff-viewer" element={<DiffViewerPage />} />
                <Route path="/components/chat" element={<ChatPage />} />
                <Route path="/components/floating-chat" element={<FloatingChatPage />} />
                <Route path="/components/terminal" element={<TerminalPage />} />
                
                {/* Charts & Graphs */}
                <Route path="/components/chart" element={<ChartPage />} />
                <Route path="/components/bar-chart" element={<ChartPage />} />
                <Route path="/components/line-chart" element={<ChartPage />} />
                <Route path="/components/pie-chart" element={<ChartPage />} />
                <Route path="/components/sparkline" element={<SparklinePage />} />
                <Route path="/components/gauge" element={<GaugePage />} />
                
                {/* Animation Hooks */}
                <Route path="/hooks/use-slide" element={<UseSlidePage />} />
                <Route path="/hooks/use-parallax" element={<UseParallaxPage />} />
                <Route path="/hooks/use-bounce" element={<UseBouncePage />} />
                <Route path="/hooks/use-float" element={<UseFloatPage />} />
                <Route path="/hooks/use-pulse" element={<UsePulsePage />} />
                <Route path="/hooks/use-shake" element={<UseShakePage />} />
                
                {/* Utility Hooks */}
                <Route path="/hooks/use-clipboard" element={<UseClipboardPage />} />
                <Route path="/hooks/use-debounce" element={<UseDebouncePage />} />
                <Route path="/hooks/use-throttle" element={<UseThrottlePage />} />
                <Route path="/hooks/use-local-storage" element={<UseLocalStoragePage />} />
                <Route path="/hooks/use-key-press" element={<UseKeyPressPage />} />
                <Route path="/hooks/use-intersection-observer" element={<UseIntersectionObserverPage />} />
                <Route path="/hooks/use-drag-drop" element={<UseDragDropPage />} />
                <Route path="/hooks/use-lazy-load" element={<UseLazyLoadPage />} />
                
                {/* v1.0.9 Hooks */}
                <Route path="/hooks/use-online" element={<UseOnlinePage />} />
                <Route path="/hooks/use-idle" element={<UseIdlePage />} />
                <Route path="/hooks/use-long-press" element={<UseLongPressPage />} />
                <Route path="/hooks/use-websocket" element={<UseWebSocketPage />} />
                <Route path="/hooks/use-page-visibility" element={<UsePageVisibilityPage />} />
                
                <Route path="/icons" element={<IconsPage />} />
                <Route path="/hooks" element={<HooksPage />} />
                <Route path="/roadmap" element={<RoadmapPage />} />
                <Route path="/templates" element={<TemplatesPage />} />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
