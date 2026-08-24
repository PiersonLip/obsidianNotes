---
status: stub
---
		
https://github.com/aome510/spotify-player


| Command                         | Description                                                                                        | Default shortcuts  |
| ------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------ |
| `NextTrack`                     | next track                                                                                         | `n`                |
| `PreviousTrack`                 | previous track                                                                                     | `p`                |
| `ResumePause`                   | resume/pause based on the current playback                                                         | `space`            |
| `PlayRandom`                    | play a random track in the current context                                                         | `.`                |
| `Repeat`                        | cycle the repeat mode                                                                              | `C-r`              |
| `Shuffle`                       | toggle the shuffle mode                                                                            | `C-s`              |
| `VolumeChange`                  | change playback volume by an offset (default shortcuts use 5%)                                     | `+`, `-`           |
| `Mute`                          | toggle playback volume between 0% and previous level                                               | `_`                |
| `SeekStart`                     | seek start of current track                                                                        | `^`                |
| `SeekForward`                   | seek forward by a duration in seconds (defaults to `seek_duration_secs`)                           | `>`                |
| `SeekBackward`                  | seek backward by a duration in seconds (defaults to `seek_duration_secs`)                          | `<`                |
| `Quit`                          | quit the application                                                                               | `C-c`, `q`         |
| `ClosePopup`                    | close a popup                                                                                      | `esc`              |
| `SelectNextOrScrollDown`        | select the next item in a list/table or scroll down (supports vim-style count: 5j)                 | `j`, `C-n`, `down` |
| `SelectPreviousOrScrollUp`      | select the previous item in a list/table or scroll up (supports vim-style count: 10k)              | `k`, `C-p`, `up`   |
| `PageSelectNextOrScrollDown`    | select the next page item in a list/table or scroll a page down (supports vim-style count: 3C-f)   | `page_down`, `C-f` |
| `PageSelectPreviousOrScrollUp`  | select the previous page item in a list/table or scroll a page up (supports vim-style count: 2C-b) | `page_up`, `C-b`   |
| `SelectFirstOrScrollToTop`      | select the first item in a list/table or scroll to the top                                         | `g g`, `home`      |
| `SelectLastOrScrollToBottom`    | select the last item in a list/table or scroll to the bottom                                       | `G`, `end`         |
| `ChooseSelected`                | choose the selected item                                                                           | `enter`            |
| `RefreshPlayback`               | manually refresh the current playback                                                              | `r`                |
| `RestartIntegratedClient`       | restart the integrated client (`streaming` feature only)                                           | `R`                |
| `ShowActionsOnSelectedItem`     | open a popup showing actions on a selected item                                                    | `g a`, `C-space`   |
| `ShowActionsOnCurrentTrack`     | open a popup showing actions on the current track                                                  | `a`                |
| `ShowActionsOnCurrentContext`   | open a popup showing actions on the current context                                                | `A`                |
| `AddSelectedItemToQueue`        | add the selected item to queue                                                                     | `Z`, `C-z`         |
| `FocusNextWindow`               | focus the next focusable window (if any)                                                           | `tab`              |
| `FocusPreviousWindow`           | focus the previous focusable window (if any)                                                       | `backtab`          |
| `SwitchTheme`                   | open a popup for switching theme                                                                   | `T`                |
| `SwitchDevice`                  | open a popup for switching device                                                                  | `D`                |
| `Search`                        | open a popup for searching in the current page                                                     | `/`                |
| `BrowseUserPlaylists`           | open a popup for browsing user's playlists                                                         | `u p`              |
| `BrowseUserFollowedArtists`     | open a popup for browsing user's followed artists                                                  | `u a`              |
| `BrowseUserSavedAlbums`         | open a popup for browsing user's saved albums                                                      | `u A`              |
| `CurrentlyPlayingContextPage`   | go to the currently playing context page                                                           | `g space`          |
| `TopTrackPage`                  | go to the user top track page                                                                      | `g t`              |
| `RecentlyPlayedTrackPage`       | go to the user recently played track page                                                          | `g r`              |
| `LikedTrackPage`                | go to the user liked track page                                                                    | `g y`              |
| `LyricsPage`                    | go to the lyrics page of the current track                                                         | `g L`, `l`         |
| `LibraryPage`                   | go to the user library page                                                                        | `g l`              |
| `SearchPage`                    | go to the search page                                                                              | `g s`              |
| `BrowsePage`                    | go to the browse page                                                                              | `g b`              |
| `Queue`                         | go to the queue page                                                                               | `z`                |
| `OpenCommandHelp`               | go to the command help page                                                                        | `?`, `C-h`         |
| `PreviousPage`                  | go to the previous page                                                                            | `backspace`, `C-q` |
| `OpenLogs`                      | go the the application logs page                                                                   | `g o`              |
| `OpenSpotifyLinkFromClipboard`  | open a Spotify link from clipboard                                                                 | `O`                |
| `SortTrackByTitle`              | sort the track table (if any) by track's title                                                     | `s t`              |
| `SortTrackByArtists`            | sort the track table (if any) by track's artists                                                   | `s a`              |
| `SortTrackByAlbum`              | sort the track table (if any) by track's album                                                     | `s A`              |
| `SortTrackByAddedDate`          | sort the track table (if any) by track's added date                                                | `s D`              |
| `SortTrackByDuration`           | sort the track table (if any) by track's duration                                                  | `s d`              |
| `SortLibraryAlphabetically`     | sort the library alphabetically                                                                    | `s l a`            |
| `SortLibraryByRecent`           | sort the library (playlists and albums) by recently added items                                    | `s l r`            |
| `ReverseOrder`                  | reverse the order of the track table (if any)                                                      | `s r`              |
| `MovePlaylistItemUp`            | move playlist item up one position                                                                 | `C-k`              |
| `MovePlaylistItemDown`          | move playlist item down one position                                                               | `C-j`              |
| `CreatePlaylist`                | create a new playlist                                                                              | `N`                |
| `JumpToCurrentTrackInContext`   | jump to the current track in the context                                                           | `g c`              |
| `JumpToHighlightTrackInContext` | jump to the currently highlighted search result in the context                                     | `C-g`              |