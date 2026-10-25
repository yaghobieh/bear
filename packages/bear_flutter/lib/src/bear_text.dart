import 'package:flutter/widgets.dart';
import 'bear_tokens.dart';

class BearText extends StatelessWidget {
  const BearText(this.data, {super.key, this.weight = BearTokens.weightRegular, this.color = BearTokens.ink});

  final String data;
  final FontWeight weight;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Text(
      data,
      style: TextStyle(fontSize: BearTokens.fontMd, fontWeight: weight, color: color),
    );
  }
}
