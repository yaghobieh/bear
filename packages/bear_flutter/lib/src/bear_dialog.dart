import 'package:flutter/widgets.dart';
import 'bear_button.dart';
import 'bear_card.dart';
import 'bear_text.dart';
import 'bear_tokens.dart';

class BearDialog extends StatelessWidget {
  const BearDialog({
    super.key,
    required this.title,
    required this.body,
    this.confirmLabel = 'OK',
    this.onConfirm,
  });

  final String title;
  final String body;
  final String confirmLabel;
  final VoidCallback? onConfirm;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: BearCard(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            BearText(title, weight: BearTokens.weightBold),
            const SizedBox(height: BearTokens.space2),
            BearText(body, color: BearTokens.inkMuted),
            const SizedBox(height: BearTokens.space4),
            BearButton(label: confirmLabel, onPressed: onConfirm),
          ],
        ),
      ),
    );
  }
}
