import { Playlist } from '../models/Session.js';
import { BrowserModel } from '../models/Browser.js';
import { PlayerModel } from '../models/Player.js';

const PlaylistView = {
  view: () => {
    return m("section.playlist", [
      m("table", [
        m("thead", [
          m("tr", [
            m("th", {className: "track",  onclick: () => Playlist.sort("track") }, "Track"),
            m("th", {className: "title",  onclick: () => Playlist.sort("title") }, "Title"),
            m("th", {className: "artist", onclick: () => Playlist.sort("artist") }, "Artist"),
            m("th", {className: "album",  onclick: () => Playlist.sort("album") }, "Album")
          ])
        ]),
        m("tbody", Playlist.items.map((item, index) => {
          return m('tr', {
            class: (item.loading ? 'loading' : '') + (index == PlayerModel.current_index ? ' playing' : '') + (Playlist.selected_items[index] ? ' selected' : ''),
            onclick: (e) => {
              console.log(Playlist.selected_items);
              Playlist.clearSelection();
              if (e.shiftKey) {
                const start   = Math.min(Playlist.last_selected, index);
                const end     = Math.max(Playlist.last_selected, index) + 1;
                for (let i = start; i != end; i++) {
                  Playlist.select(i);
                }
              } else {
                Playlist.select(index);
                if (Playlist.last_selected == index) {
                  PlayerModel.set(index)
                }
                Playlist.last_selected = index;
              }
            }
          }, [
            m('td', item.track),
            m('td', item.title || item.filename.substring(item.filename.lastIndexOf('/')+1)),
            m('td', item.artist),
            m('td', item.album)
          ])
        }))
      ])
    ])
  }
};

export { PlaylistView };
