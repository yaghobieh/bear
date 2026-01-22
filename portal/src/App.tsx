import { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BearLoader } from './components/BearLoader';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';

// Banner configuration
const BANNER_CONFIG = {
  id: 'bear-roadmap-2026',
  message: '🚀 Influence Bear UI\'s 2026 roadmap! Take our latest Developer Survey',
  link: 'https://github.com/yaghobieh/bear-ui/discussions',
  linkText: 'Take the survey →',
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
const DatePickerPage = lazy(() => import('./pages/components/DatePicker'));
const TimePickerPage = lazy(() => import('./pages/components/TimePicker'));

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
const KbdPage = lazy(() => import('./pages/components/Kbd'));
const CopyButtonPage = lazy(() => import('./pages/components/CopyButton'));

// Navigation Components
const LinkPage = lazy(() => import('./pages/components/Link'));
const TabsPage = lazy(() => import('./pages/components/Tabs'));
const AccordionPage = lazy(() => import('./pages/components/Accordion'));
const MenuPage = lazy(() => import('./pages/components/Menu'));
const DropdownPage = lazy(() => import('./pages/components/Dropdown'));
const SpeedDialPage = lazy(() => import('./pages/components/SpeedDial'));

// Utilities
const IconsPage = lazy(() => import('./pages/Icons'));
const HooksPage = lazy(() => import('./pages/Hooks'));

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
                
                <Route path="/components/date-picker" element={<DatePickerPage />} />
                <Route path="/components/time-picker" element={<TimePickerPage />} />
                
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
                
                <Route path="/icons" element={<IconsPage />} />
                <Route path="/hooks" element={<HooksPage />} />
                
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
