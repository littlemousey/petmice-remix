interface ErrorViewProps {
  error: string;
}

export default function ErrorView({ error }: ErrorViewProps) {
  return (
    <div className="error-container">
      <h2>Oops! Something went wrong</h2>
      <p>{error}</p>
      <p>Please check your connection and try again.</p>
      <p>In the meantime, please enjoy this poem:</p>
      <article>
        <h3>
          To a Mouse, on Turning Her Up in Her Nest With the Plough, November,
          1785
        </h3>
        <p
          style={{
            fontStyle: "italic",
            maxWidth: "600px",
            margin: "20px auto",
            textAlign: "left",
            lineHeight: "1.6",
          }}
        >
          Wee, sleekit, cow'rin, tim'rous beastie,
          <br />
          O, what a panic's in thy breastie!
          <br />
          Thou need na start awa sae hasty,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Wi' bickering brattle!
          <br />
          I wad be laith to rin an' chase thee,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Wi' murd'ring pattle!
          <br />
          <br />
          I'm truly sorry man's dominion,
          <br />
          Has broken nature's social union,
          <br />
          An' justifies that ill opinion,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Which makes thee startle
          <br />
          At me, thy poor, earth-born companion,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;An' fellow-mortal!
          <br />
          <br />
          I doubt na, whiles, but thou may thieve;
          <br />
          What then? poor beastie, thou maun live!
          <br />
          A daimen icker in a thrave
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;'S a sma' request;
          <br />
          I'll get a blessin wi' the lave,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;An' never miss't!
          <br />
          <br />
          Thy wee bit housie, too, in ruin!
          <br />
          It's silly wa's the win's are strewin!
          <br />
          An' naething, now, to big a new ane,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;O' foggage green!
          <br />
          An' bleak December's winds ensuin,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Baith snell an' keen!
          <br />
          <br />
          Thou saw the fields laid bare an' waste,
          <br />
          An' weary winter comin fast,
          <br />
          An' cozie here, beneath the blast,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Thou thought to dwell—
          <br />
          Till crash! the cruel coulter past
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Out thro' thy cell.
          <br />
          <br />
          That wee bit heap o' leaves an' stibble,
          <br />
          Has cost thee mony a weary nibble!
          <br />
          Now thou's turn'd out, for a' thy trouble,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;But house or hald,
          <br />
          To thole the winter's sleety dribble,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;An' cranreuch cauld!
          <br />
          <br />
          But, Mousie, thou art no thy lane,
          <br />
          In proving foresight may be vain;
          <br />
          The best-laid schemes o' mice an' men
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;Gang aft agley,
          <br />
          An' lea'e us nought but grief an' pain,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;For promis'd joy!
          <br />
          <br />
          Still thou art blest, compar'd wi' me
          <br />
          The present only toucheth thee:
          <br />
          But, Och! I backward cast my e'e.
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;On prospects drear!
          <br />
          An' forward, tho' I canna see,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;I guess an' fear!
        </p>
      </article>
    </div>
  );
}
