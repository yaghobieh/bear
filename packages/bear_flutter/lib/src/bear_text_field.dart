import 'package:flutter/material.dart';
import 'bear_theme.dart';
import 'bear_tokens.dart';

class BearTextField extends StatelessWidget {
  const BearTextField({
    super.key,
    this.hint = '',
    this.controller,
    this.onChanged,
  });

  final String hint;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;

  @override
  Widget build(BuildContext context) {
    final theme = BearTheme.of(context);
    return TextField(
      controller: controller,
      onChanged: onChanged,
      style: TextStyle(color: theme.ink, fontSize: BearTokens.fontMd),
      cursorColor: theme.primary,
      decoration: InputDecoration(
        hintText: hint,
        filled: true,
        fillColor: theme.surface,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: BearTokens.space3,
          vertical: BearTokens.space3,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(theme.radius),
          borderSide: const BorderSide(color: BearTokens.line),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(theme.radius),
          borderSide: BorderSide(color: theme.primary),
        ),
      ),
    );
  }
}
