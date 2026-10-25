import 'package:flutter/widgets.dart';
import 'bear_text.dart';
import 'bear_theme.dart';
import 'bear_tokens.dart';

class BearAppBar extends StatelessWidget {
  const BearAppBar({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    final theme = BearTheme.of(context);
    return DecoratedBox(
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: BearTokens.line)),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: BearTokens.space4,
          vertical: BearTokens.space3,
        ),
        child: BearText(title, weight: BearTokens.weightBold, color: theme.ink),
      ),
    );
  }
}
