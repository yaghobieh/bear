import 'package:flutter/widgets.dart';
import 'bear_tokens.dart';

class BearList extends StatelessWidget {
  const BearList({super.key, required this.children});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        for (var index = 0; index < children.length; index += 1) ...[
          children[index],
          if (index < children.length - 1) const SizedBox(height: BearTokens.space2),
        ],
      ],
    );
  }
}
