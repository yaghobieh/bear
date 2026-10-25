import 'package:flutter/widgets.dart';
import 'bear_theme.dart';
import 'bear_tokens.dart';

class BearCard extends StatelessWidget {
  const BearCard({super.key, required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final theme = BearTheme.of(context);
    return DecoratedBox(
      decoration: BoxDecoration(
        color: theme.surface,
        borderRadius: BorderRadius.circular(BearTokens.radiusLg),
        border: Border.all(color: BearTokens.line),
      ),
      child: Padding(
        padding: const EdgeInsets.all(BearTokens.space4),
        child: child,
      ),
    );
  }
}
