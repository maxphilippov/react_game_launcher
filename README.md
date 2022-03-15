Not content with current version. This seems to boring and unchallening, in process of changing the original goal.

Let's design a hypothetical game launcher

You can add games to your library (just random for now)

Every game comes to your library as just available for download.
Every game takes some time to download.
After you've downloaded it, it's available to play.
You can download only one game at the time. But you can pause any time you want and start downloading (or resume some other game)
We want to target a case of 300 games at once in library. This doesn't seem challenging just to render.

My train of thought:

1. Separate lists for available games and downloaded games
With 400 games in library performance dips right after the game downloads as we have to repaint whole games list.
Maybe if we have a separate list for games to be downloaded it's gonna be smooth. But maybe we have to repopulate lists, since if we don't store everything in one element containers will have separate length.