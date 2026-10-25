import 'package:flutter/widgets.dart';
import 'bear_tokens.dart';

class BearBottomSheet extends StatelessWidget {
  const BearBottomSheet({super.key, required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.bottomCenter,
      child: DecoratedBox(
        decoration: const BoxDecoration(
          color: BearTokens.surface,
          borderRadius: BorderRadius.vertical(top: Radius.circular(BearTokens.radiusLg)),
          border: Border(top: BorderSide(color: BearTokens.line)),
        ),
        child: Padding(
          padding: const EdgeInsets.all(BearTokens.space4),
          child: child,
        ),
      ),
    );
  }
}
