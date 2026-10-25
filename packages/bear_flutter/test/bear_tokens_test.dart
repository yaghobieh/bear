import 'package:flutter_test/flutter_test.dart';
import 'package:bear_flutter/bear_flutter.dart';

void main() {
  test('primary token matches Bear pink', () {
    expect(BearTokens.primary.toARGB32(), 0xFFEC4899);
  });
}
