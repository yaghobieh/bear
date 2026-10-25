import 'package:flutter/widgets.dart';
import 'bear_tokens.dart';

class BearThemeData {
  const BearThemeData({
    this.primary = BearTokens.primary,
    this.surface = BearTokens.surface,
    this.ink = BearTokens.ink,
    this.radius = BearTokens.radiusMd,
    this.density = BearDensity.normal,
  });

  final Color primary;
  final Color surface;
  final Color ink;
  final double radius;
  final BearDensity density;

  static const BearThemeData dark = BearThemeData(
    surface: BearTokens.surfaceDark,
    ink: Color(0xFFFAFAFA),
  );
}

enum BearDensity { compact, normal, comfortable }

class BearTheme extends InheritedWidget {
  const BearTheme({super.key, required this.data, required super.child});

  final BearThemeData data;

  static BearThemeData of(BuildContext context) {
    final theme = context.dependOnInheritedWidgetOfExactType<BearTheme>();
    return theme?.data ?? const BearThemeData();
  }

  @override
  bool updateShouldNotify(BearTheme oldWidget) => oldWidget.data != data;
}
