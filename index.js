const TANK_COLOR = "#000088";
const DPS_COLOR = "#880000";
const HEALER_COLOR = "#008800";
const YOU_COLOR = "#888800";
const DEFAULT_COLOR = "#888888";

function is_tank(role)
{
  return (
    role == "Gbr" ||
    role == "Drk" ||
    role == "Pld" ||
    role == "War"
  );
}
function is_healer(role)
{
  return (
    role == "Whm" ||
    role == "Sch" ||
    role == "Sge" ||
    role == "Ast"
  );
}
function is_dps(role)
{
  return (
    role == "Smn" ||
    role == "Mnk" ||
    role == "Sam" ||
    role == "Drg" ||
    role == "Rpr" ||
    role == "Blm" ||
    role == "Rdm" ||
    role == "Pct" ||
    role == "Blu" ||
    role == "Mch" ||
    role == "Brd" ||
    role == "Dnc" ||
    role == "Nin" ||
    role == "Vpr"
  );
}

function new_row()
{
  let a = td("").attr("class", "row_name");
  let b = td("").attr("class", "row_dmg");
  let c = td("").attr("class", "row_role");

  let ret = tr(c, a, b);


  ret.set_name = function(name) 
  {
    a.innerHTML = name;
  }

  ret.set_dmg = function(dmg) 
  {
    b.innerHTML = dmg;
  }

  ret.clear = function()
  {
    a.innerHTML = "";
    b.innerHTML = "";
    c.innerHTML = "";
    ret.attr("style", "display: none");
  }

  ret.set_role = function(role, is_you)
  {
    // background
    if(is_dps(role)) 
    {
      ret.attr("style", "background: " + DPS_COLOR);
    }
    else if (is_tank(role))
    {
      ret.attr("style", "background: " + TANK_COLOR);
    }
    else if (is_healer(role))
    {
      ret.attr("style", "background: " + HEALER_COLOR);
    }
    else 
    {
      ret.attr("style", "background: " + DEFAULT_COLOR);
    }

    /// override if it's you
    if (is_you)
    {
      ret.attr("style", "background: " + YOU_COLOR );
    }

    // set text
    c.innerHTML = role;

  }
  return ret; 

}

let entries = Array(24);
for(let i = 0; i < entries.length; ++i)
{
  entries[i] = new_row();
}

//
// @note: this is the main event
//
function update(data) 
{
  //if (data.isActive)
  {
    let i = 0
    for(const [k,v] of Object.entries(data.Combatant))
    {
      console.log(v);
      entries[i].set_name(k);
      entries[i].set_dmg(v.ENCDPS);

      if (v.Job == "Limit Break")
        v.Job = "LB";
      entries[i].set_role(v.Job, k == "YOU");
      ++i;
      if (i >= entries.length) break;
    }
    
    // clear the rest of the entries
    while(i < entries.length)
    {
      entries[i].clear();
      ++i;
    }
  }
}



main.appendChild(table(...entries));
addOverlayListener("CombatData", (e) => update(e));
startOverlayEvents();
console.log("hello world");
