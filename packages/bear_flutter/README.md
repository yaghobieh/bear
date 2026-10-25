# bear_flutter

The Flutter kit for Bear. It reads the same color, radius, space, and type as `@forgedevstack/bear`. Web stays React. Mobile stays Flutter.

Free in 0.1.0: `BearButton`, `BearTextField`, `BearCard`, `BearAppBar`, `BearList`, `BearDialog`, `BearBottomSheet`, and `BearTheme`.

```yaml
dependencies:
  bear_flutter: ^0.1.0
```

```dart
import 'package:bear_flutter/bear_flutter.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return BearTheme(
      data: const BearThemeData(),
      child: Column(
        children: const [
          BearAppBar(title: 'Bear'),
          BearButton(label: 'Continue'),
        ],
      ),
    );
  }
}
```

Publish from this folder when the pub.dev credentials are ready:

```bash
dart pub publish
```
