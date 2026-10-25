import 'package:flutter/widgets.dart';
import 'bear_theme.dart';
import 'bear_tokens.dart';

enum BearButtonVariant { primary, outline }

class BearButton extends StatelessWidget {
  const BearButton({
    super.key,
    required this.label,
    this.onPressed,
    this.variant = BearButtonVariant.primary,
  });

  final String label;
  final VoidCallback? onPressed;
  final BearButtonVariant variant;

  @override
  Widget build(BuildContext context) {
    final theme = BearTheme.of(context);
    final filled = variant == BearButtonVariant.primary;
    return GestureDetector(
      onTap: onPressed,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: filled ? theme.primary : theme.surface,
          borderRadius: BorderRadius.circular(theme.radius),
          border: Border.all(color: filled ? theme.primary : BearTokens.line),
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: BearTokens.space4,
            vertical: BearTokens.space3,
          ),
          child: Text(
            label,
            style: TextStyle(
              color: filled ? BearTokens.surface : theme.ink,
              fontSize: BearTokens.fontSm,
              fontWeight: BearTokens.weightMedium,
            ),
          ),
        ),
      ),
    );
  }
}
