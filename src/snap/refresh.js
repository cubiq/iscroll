
		if ( this.options.snap ) {
			var snap = this._nearestSnap(this.x, this.y);
			if ( this.x == snap.x && this.y == snap.y ) {
				return;
			}

			this.currentPage = snap;
			this.scrollTo(snap.x, snap.y);
		}
