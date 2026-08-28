# May Learning Hub Certificate Rollout

Use this checklist when enabling certificates on another assessment game.

## 1. Add page metadata

Add the five certificate fields to the game page's `<body>` element:

```html
<body
  data-certificate-grade="Grade 10"
  data-certificate-subject="Geography"
  data-certificate-term="Term 3"
  data-certificate-topic="Example Topic"
  data-certificate-game="Example Topic Quiz">
```

The shared controller and PNG renderer read these values. They must describe the current page rather than a copied template.

## 2. Load the shared scripts in order

Use the relative path required by the page's folder depth:

```html
<script src="../../../../../../game-audio.js"></script>
<script src="../../../../../../may-certificate-renderer.js"></script>
<script src="../../../../../../may-certificate-actions.js"></script>
<script src="../../../../../../assessment-certificate.js"></script>
```

The renderer must load before the action helper, and the action helper must load before the assessment controller.

## 3. Choose the correct certificate mode

Use a scored certificate only when the game objectively records correct responses:

```js
MayHubCertificates.showScored({
  category: 'Multiple Choice',
  correct: correctAnswers,
  total: questionCount,
  onReplay: restartGame
});
```

Use participation for games that reveal answers or cannot mark each learner response reliably:

```js
MayHubCertificates.showParticipation({
  category: 'Memory Review',
  onReplay: restartGame
});
```

Show the certificate once per completion. Participation always uses the pass sound. Scored certificates use pass at 50% or above and fail below 50%.

## 4. Sharing, downloads and offline behavior

The shared code automatically provides:

- concise WhatsApp text without duplicating the name or result;
- the certificate PNG as the shared file;
- the modern Android message channel first;
- token-protected older-app and offline-archive compatibility;
- ordinary browser download and Web Share fallbacks;
- runtime caching of visited HTML pages.

Shared scripts, the logo and sounds are pre-cached. Game pages are refreshed and cached when visited, so the service worker does not need a manual entry for every new topic.

## 5. Validate before rollout

From the website root, run:

```powershell
node validate-certificate-rollout.js "path\to\the\topic\games"
```

The validator checks certificate metadata, shared-script order, local paths, JavaScript syntax, duplicate handlers and renderer code, scored totals, service-worker compatibility and obsolete sharing captions.

Run the shared renderer and delivery-channel runtime tests as well:

```powershell
node test-certificate-runtime.js
```

These tests cover scored and participation PNGs, long metadata, collision-safe filenames, concurrent modern Android replies, the token-protected older-app bridge, browser downloads and the rule preventing an accepted native request from also triggering a browser action.
